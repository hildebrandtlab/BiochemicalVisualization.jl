"""
Drive a JupyterLab session via Playwright to verify Bonito's Julia↔JS round-trip
works in BiochemicalVisualization.

Strategy:
  - Start jupyter-lab with --LabApp.expose_app_in_browser=True so we can call
    JupyterLab's command registry directly from the page (no fragile UI driving).
  - Open the notebook, run all cells via `notebook:run-all-cells`.
  - Poll kernel idle via Jupyter Server REST API to know when cells finish.
  - Probe browser-side state (bv-scene count, WebSocket frames) and simulate
    a Model button click; verify Julia round-trip via new WS frames.

Usage:
    uv run python scripts/test_driver.py [--headed] [--no-startup-timeout]

Exit 0 on success; non-zero with a failure summary + screenshot otherwise.
"""

from __future__ import annotations

import argparse
import asyncio
import contextlib
import json
import signal
import subprocess
import sys
import tempfile
import time
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path

from playwright.async_api import (
    Browser,
    BrowserContext,
    ConsoleMessage,
    Page,
    Response,
    WebSocket,
    async_playwright,
)

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_NOTEBOOK = ROOT / "scripts" / "test_notebook.ipynb"
NOTEBOOK = DEFAULT_NOTEBOOK   # rebound from --notebook CLI arg in main()
LAB_PORT = 8889
LAB_URL = f"http://127.0.0.1:{LAB_PORT}"
JUPYTER_LOG = ROOT / "scripts" / "test_driver_jupyter.log"
DRIVER_LOG = ROOT / "scripts" / "test_driver.log"

# Tee everything to DRIVER_LOG so we can tail -f while the driver runs.
_driver_log_fp = None
def log(msg: str) -> None:
    global _driver_log_fp
    if _driver_log_fp is None:
        _driver_log_fp = DRIVER_LOG.open("w", buffering=1)  # line-buffered
    line = f"[{time.strftime('%H:%M:%S')}] {msg}"
    print(line, flush=True)
    _driver_log_fp.write(line + "\n")
    _driver_log_fp.flush()


# ---------------------------------------------------------------------------
# Counters — track everything we want to assert on.
# ---------------------------------------------------------------------------
@dataclass
class Counters:
    console_msgs: list[tuple[str, str]] = field(default_factory=list)
    ws_opens: list[str] = field(default_factory=list)
    ws_closes: list[tuple[str, str]] = field(default_factory=list)
    ws_frames_sent: int = 0
    ws_frames_recv: int = 0
    failed_requests: list[tuple[str, int]] = field(default_factory=list)
    asset_requests: list[tuple[str, int, str]] = field(default_factory=list)


def _attach_listeners(page: Page, c: Counters) -> None:
    def on_console(msg: ConsoleMessage) -> None:
        c.console_msgs.append((msg.type, msg.text))
        # Surface BCV diagnostics live — they trace the round-trip hops
        # (request dispatched → scene push received → scene rebuilt).
        if "[BCV-DIAG]" in msg.text or "[BCV]" in msg.text:
            log(f"  → console: {msg.text[:200]}")

    def on_pageerror(err) -> None:
        # Unhandled JS exceptions / promise rejections never hit the console
        # listener; without this a failed dynamic import() is invisible.
        c.console_msgs.append(("pageerror", str(err)))

    def on_websocket(ws: WebSocket) -> None:
        c.ws_opens.append(ws.url)
        ws.on("close", lambda _: c.ws_closes.append((ws.url, "closed")))
        ws.on("framesent", lambda _: setattr(c, "ws_frames_sent", c.ws_frames_sent + 1))
        ws.on("framereceived", lambda _: setattr(c, "ws_frames_recv", c.ws_frames_recv + 1))

    def on_response(resp: Response) -> None:
        if resp.status >= 400:
            c.failed_requests.append((resp.url, resp.status))
        # Track the Bonito bundle/asset fetches so a proxy-mode run shows
        # whether the browser ever requested the externalized bundle (and
        # what content type came back — an HTML error page here means auth
        # or routing trouble that a bare status can't reveal).
        if "/assets/" in resp.url:
            ctype = resp.headers.get("content-type", "?")
            c.asset_requests.append((resp.url, resp.status, ctype))
            log(f"  → asset response: {resp.status} {ctype} {resp.url}")

    page.on("console", on_console)
    page.on("pageerror", on_pageerror)
    page.on("websocket", on_websocket)
    page.on("response", on_response)


# ---------------------------------------------------------------------------
# Jupyter Lab lifecycle.
# ---------------------------------------------------------------------------
@contextlib.contextmanager
def jupyter_lab(extra_args: list[str] | None = None):
    """Start jupyter-lab in subprocess, kill on exit. Log to a persistent file."""
    # Use a per-run workspace dir so JupyterLab doesn't restore previously
    # opened notebooks (we hit this — driver kept opening multiple_plots.ipynb
    # from the restored workspace instead of our test notebook).
    workspaces_dir = Path(tempfile.mkdtemp(prefix="bv-jlab-ws-"))
    cmd = [
        sys.executable, "-m", "jupyter", "lab",
        f"--ServerApp.port={LAB_PORT}",
        "--ServerApp.ip=127.0.0.1",
        "--ServerApp.token=",
        "--ServerApp.password=",
        "--ServerApp.disable_check_xsrf=True",
        "--ServerApp.allow_origin_pat=^https?://(localhost|127\\.0\\.0\\.1)(:\\d+)?$",
        "--ServerApp.open_browser=False",
        f"--ServerApp.root_dir={ROOT}",
        f"--LabApp.workspaces_dir={workspaces_dir}",
        "--LabApp.expose_app_in_browser=True",   # ← critical: exposes window.jupyterapp
        "--no-browser",
    ]
    if extra_args:
        cmd += extra_args
    log_fp = JUPYTER_LOG.open("w")
    proc = subprocess.Popen(cmd, stdout=log_fp, stderr=subprocess.STDOUT)
    try:
        deadline = time.time() + 60
        while time.time() < deadline:
            try:
                urllib.request.urlopen(LAB_URL + "/api/status", timeout=0.5).read()
                break
            except Exception:
                time.sleep(0.5)
        else:
            log_fp.close()
            print(JUPYTER_LOG.read_text())
            raise RuntimeError(f"jupyter-lab did not become ready at {LAB_URL}")
        yield proc
    finally:
        proc.send_signal(signal.SIGINT)
        try:
            proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            proc.kill()
        log_fp.close()


# ---------------------------------------------------------------------------
# Drive JupyterLab via its in-page commands API.
# ---------------------------------------------------------------------------
JUPYTER_APP_HOOK = """
() => {
  // JupyterLab 4 sets window.jupyterapp when started with
  // --LabApp.expose_app_in_browser=True.
  return new Promise(resolve => {
    const t0 = Date.now();
    (function check() {
      if (window.jupyterapp && window.jupyterapp.commands) {
        return resolve({ok: true, after_ms: Date.now() - t0});
      }
      if (Date.now() - t0 > 30000) {
        return resolve({ok: false, after_ms: Date.now() - t0,
                        keys: Object.keys(window).filter(k => k.toLowerCase().includes('jupyter'))});
      }
      setTimeout(check, 100);
    })();
  });
}
"""


async def wait_for_jupyter_app(page: Page) -> dict:
    """Block until window.jupyterapp is available (LabApp.expose_app_in_browser)."""
    res = await page.evaluate(JUPYTER_APP_HOOK)
    return res


async def run_command(page: Page, cmd: str) -> dict:
    """Execute a JupyterLab command via window.jupyterapp.commands."""
    return await page.evaluate(
        """async (cmd) => {
          if (!window.jupyterapp || !window.jupyterapp.commands.hasCommand(cmd)) {
            return {ok: false, error: `command not registered: ${cmd}`,
                    available: window.jupyterapp ? window.jupyterapp.commands.listCommands().filter(c => c.includes('run')) : null};
          }
          try {
            await window.jupyterapp.commands.execute(cmd);
            return {ok: true};
          } catch (e) {
            return {ok: false, error: String(e)};
          }
        }""",
        cmd,
    )


async def wait_kernel_idle(timeout_s: int = 600) -> bool:
    """Wait for kernel to go busy then return to idle.

    The kernel is already 'idle' before we dispatch run-all-cells, so we must
    require a busy→idle transition; otherwise we'd return immediately.
    Logs progress every few seconds so a slow precompile doesn't look hung.
    """
    deadline = time.time() + timeout_s
    saw_busy = False
    last_state = None
    last_progress = time.time()
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(LAB_URL + "/api/kernels", timeout=2) as r:
                kernels = json.loads(r.read())
        except Exception:
            await asyncio.sleep(0.5)
            continue
        if not kernels:
            await asyncio.sleep(0.5)
            continue
        state = kernels[0].get("execution_state")
        if state != last_state:
            log(f"  → kernel state: {state}")
            last_state = state
            last_progress = time.time()
        if state == "busy":
            saw_busy = True
        if saw_busy and state == "idle":
            return True
        if time.time() - last_progress > 30:
            log(f"  → still waiting (state={state}, saw_busy={saw_busy}, elapsed={int(time.time() - (deadline - timeout_s))}s)")
            last_progress = time.time()
        await asyncio.sleep(1.0)
    log(f"  → wait_kernel_idle timed out after {timeout_s}s; saw_busy={saw_busy}, last_state={last_state}")
    return False


# ---------------------------------------------------------------------------
# Main test flow.
# ---------------------------------------------------------------------------
async def open_notebook(context: BrowserContext, notebook: Path) -> Page:
    rel = notebook.relative_to(ROOT).as_posix()
    page = await context.new_page()
    url = f"{LAB_URL}/lab/tree/{rel}"
    log(f"  → opening {url}")
    await page.goto(url, wait_until="domcontentloaded")
    return page


async def run_main(args) -> int:
    failures: list[str] = []
    async with async_playwright() as pw:
        browser: Browser = await pw.chromium.launch(headless=not args.headed)
        context = await browser.new_context()
        page = await open_notebook(context, NOTEBOOK)
        c = Counters()
        _attach_listeners(page, c)

        log("  → waiting for window.jupyterapp")
        hook = await wait_for_jupyter_app(page)
        if not hook["ok"]:
            failures.append(f"window.jupyterapp not available after {hook['after_ms']}ms; saw keys: {hook.get('keys')}")
            await _dump_failure(page, c, failures)
            await browser.close()
            return 1
        log(f"  → jupyterapp ready after {hook['after_ms']}ms")

        # JupyterLab loads the notebook lazily; give it a moment for the notebook
        # widget to register itself with the command system.
        await asyncio.sleep(2)

        # Wait for the kernel to finish starting before we dispatch
        # run-all-cells. JupyterLab won't queue execution against a kernel
        # that's still in the 'starting' state.
        log("  → waiting for kernel to finish starting")
        ready_deadline = time.time() + 60
        kernel_ready = False
        while time.time() < ready_deadline:
            try:
                with urllib.request.urlopen(LAB_URL + "/api/kernels", timeout=2) as r:
                    ks = json.loads(r.read())
                if ks and ks[0].get("execution_state") == "idle":
                    log(f"  → kernel {ks[0]['id'][:8]} ready (state=idle)")
                    kernel_ready = True
                    break
            except Exception:
                pass
            await asyncio.sleep(0.5)
        if not kernel_ready:
            failures.append("kernel did not reach idle within 60s of opening notebook")
            await _dump_failure(page, c, failures)
            await browser.close()
            return 1

        # The notebook needs to be the currently-focused widget for
        # notebook:run-all-cells to find it. Make sure it is.
        log("  → checking current notebook widget")
        info = await page.evaluate("""
            () => {
              const app = window.jupyterapp;
              if (!app) return {ok: false, reason: 'no jupyterapp'};
              const shell = app.shell;
              const current = shell.currentWidget;
              const info = {
                  ok: true,
                  current_widget_id: current ? current.id : null,
                  current_widget_class: current ? current.constructor.name : null,
                  has_notebook_cmd: app.commands.hasCommand('notebook:run-all-cells'),
                  all_run_cmds: app.commands.listCommands().filter(c => c.startsWith('notebook:run')),
              };
              // Try to find the notebook in the main area
              const widgets = Array.from(shell.widgets ? shell.widgets('main') : []);
              info.main_widgets = widgets.map(w => ({id: w.id, cls: w.constructor.name, title: w.title.label}));
              return info;
            }
        """)
        log(f"  → app state: {json.dumps(info)[:500]}")

        # Try to explicitly activate THIS notebook by title (the fresh workspace
        # should mean only our notebook is open, but be precise just in case).
        target_title = NOTEBOOK.name
        nb_widget = next(
            (w for w in info.get("main_widgets", []) if (w.get("title") or "") == target_title),
            None,
        )
        if nb_widget is None:
            # Fallback: any ipynb widget
            nb_widget = next(
                (w for w in info.get("main_widgets", []) if "ipynb" in (w.get("title") or "").lower()),
                None,
            )
        if nb_widget:
            log(f"  → activating notebook widget {nb_widget['id']}")
            await page.evaluate(
                "id => window.jupyterapp.shell.activateById(id)", nb_widget["id"]
            )
            await asyncio.sleep(1)
        else:
            log("  → WARNING: could not find a notebook widget in main area")

        log("  → invoking notebook:run-all-cells (blocks until all cells finish)")
        t0 = time.time()
        res = await run_command(page, "notebook:run-all-cells")
        log(f"  → run-all-cells returned after {time.time() - t0:.1f}s: {res}")
        if not res["ok"]:
            failures.append(f"notebook:run-all-cells failed: {res}")
            await _dump_failure(page, c, failures)
            await browser.close()
            return 1

        # JupyterLab's run-all-cells awaits execution synchronously, so cells
        # have already executed by the time we get here. Give the browser a
        # beat to render the Bonito output then proceed to checks.
        await asyncio.sleep(3)

        # ----- Assertions on browser-side state -----
        bv_scenes = await page.locator("bv-scene").count()
        log(f"  → bv-scene elements: {bv_scenes}")
        if bv_scenes == 0:
            failures.append("no <bv-scene> rendered after Run All Cells")

        log(f"  → all WebSocket URLs ({len(c.ws_opens)}):")
        for u in c.ws_opens:
            log(f"      {u}")
        # A Bonito session WebSocket is any ws:// that is NOT one of
        # JupyterLab's own (/api/kernels/, /api/events/). In proxy mode
        # it routes through /proxy/<port>/<session-uuid>; in direct mode
        # it's ws://localhost:<ephemeral-port>/<session-uuid>. Either
        # way it lacks the /api/ path JupyterLab uses.
        bv_ws = [u for u in c.ws_opens if "/api/" not in u]
        log(f"  → Bonito-candidate WebSocket opens: {len(bv_ws)}")
        for u in bv_ws:
            log(f"      bonito-ws: {u}")
        log(f"  → WS frames sent: {c.ws_frames_sent}, received: {c.ws_frames_recv}")
        # Only fail on frames if we identified a Bonito WS but no frames flowed.
        if bv_ws and c.ws_frames_recv == 0:
            failures.append("Bonito WebSocket opened but no frames received from Julia")

        # ----- Round-trip probe on EACH bv-scene -----
        # We dispatch bv-request-model on each scene's container div and check
        # whether new WS frames arrive (= Julia received the event and is
        # sending back the rebuilt representation). This reveals whether the
        # round-trip works for ALL plots or only some (the "first plot doesn't
        # round-trip, second does" pattern user reported).
        if bv_scenes > 0:
            div_ids = await page.evaluate("""
                () => Array.from(document.querySelectorAll('[id^="bv-scene-"][id$="-div"]'))
                          .map(d => d.id)
            """)
            log(f"  → scene_div ids: {div_ids}")
            # Every scene must have real rendered size. A functional
            # round-trip can succeed inside a visually collapsed scene
            # (e.g. when a percentage height finds no sized ancestor —
            # the Bonito 5 display:contents wrappers regression), so
            # check the layout box explicitly.
            sizes = await page.evaluate("""
                () => Array.from(document.querySelectorAll('bv-scene')).map(el => {
                    const r = el.getBoundingClientRect();
                    return {id: el.id, w: Math.round(r.width), h: Math.round(r.height)};
                })
            """)
            log(f"  → scene sizes: {sizes}")
            too_small = [s for s in sizes if s["h"] < 150 or s["w"] < 150]
            if too_small:
                failures.append(f"scene(s) rendered too small (<150px): {too_small}")
            # Sequence: scene 2, scene 1, scene 2 again, scene 1 again.
            # If only the FIRST dispatch in the sequence is delivered, then
            # "second dispatch onwards silently blocked" is the bug shape.
            # If 1st+3rd work but 2nd+4th don't, alternating-only-works pattern.
            div_ids = list(reversed(div_ids)) + list(reversed(div_ids))
            log(f"  → probe sequence: {div_ids}")
            results = []
            for i, div_id in enumerate(div_ids):
                log(f"  → probing scene {i+1}/{len(div_ids)}: {div_id}")
                # REAL round-trip signal: dispatch a model switch and wait
                # for the rebuilt scene to come BACK from Julia and re-render
                # — observed via the representation sidebar, whose active row
                # shows "<i>: <TYPE>". We must NOT count received WS frames:
                # Bonito sends periodic ping frames, so frame-counting passes
                # even when the back-channel is completely dead. We read the
                # rep type straight from the rendered DOM, so this only
                # succeeds on a genuine Julia → JS round-trip + re-render.
                async def _types_in(div: str) -> list:
                    return await page.evaluate(
                        """(id) => {
                          const root = document.getElementById(id);
                          if (!root) return [];
                          return [...root.querySelectorAll('div')]
                            .map(d => (d.textContent || '').match(/^\\d+:\\s*([A-Z_]+)$/))
                            .filter(Boolean).map(m => m[1]);
                        }""", div)
                # Pick a target type NOT currently shown, so success
                # requires a genuine change (no false positive from
                # re-requesting the type already displayed).
                before = await _types_in(div_id)
                target = "STICK" if "STICK" not in before else "VAN_DER_WAALS"
                ok = await page.evaluate(
                    """({id, t}) => {
                      const div = document.getElementById(id);
                      if (!div) return false;
                      div.dispatchEvent(new CustomEvent('bv-request-model',
                                                       {detail: {type: t}}));
                      return true;
                    }""",
                    {"id": div_id, "t": target},
                )
                if not ok:
                    results.append((div_id, False, "div not found"))
                    continue
                deadline = time.time() + 10
                got = False
                while time.time() < deadline:
                    if target in await _types_in(div_id):
                        got = True
                        break
                    await asyncio.sleep(0.2)
                results.append((div_id, got,
                                f"rep→{target}" if got else f"rep never became {target}"))
                log(f"  → scene {i+1}: dispatched type={target}, "
                    f"{'OK (scene rebuilt)' if got else 'NO REPLY (back-channel dead)'}")
                # Space out dispatches so a slow rebuild from one doesn't
                # bleed into the next probe's window.
                await asyncio.sleep(3.0)

            ok_count = sum(1 for r in results if r[1])
            log(f"  → summary: {ok_count}/{len(results)} dispatches round-tripped")
            for i, (div_id, ok, detail) in enumerate(results):
                log(f"      step {i+1}: {div_id} → {'OK' if ok else 'NO REPLY'} ({detail})")
            if ok_count < len(results):
                failures.append(
                    f"only {ok_count}/{len(results)} dispatches round-tripped to Julia "
                    f"(measured via [BCV-DIAG] update.applied, not ping frames)"
                )

        if failures:
            await _dump_failure(page, c, failures)
            await browser.close()
            return 1

        log("\n  ✓ all checks passed")
        await browser.close()
        return 0


async def _dump_failure(page: Page, c: Counters, failures: list[str]) -> None:
    ts = int(time.time())
    shot = ROOT / f"test_driver_failure_{ts}.png"
    try:
        await page.screenshot(path=str(shot), full_page=True, timeout=10_000)
        log(f"\n  → screenshot: {shot}")
    except Exception as e:
        log(f"  → screenshot failed: {e}")
    log(f"\n  ✗ failures ({len(failures)}):")
    for f in failures:
        print(f"      - {f}")
    log("\n  → last 25 console messages:")
    for kind, text in c.console_msgs[-25:]:
        print(f"      [{kind}] {text[:240]}")
    if c.failed_requests:
        log("\n  → failed HTTP responses:")
        for u, code in c.failed_requests[-10:]:
            print(f"      {code} {u}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--headed", action="store_true", help="show the browser window")
    parser.add_argument(
        "--notebook",
        choices=["direct", "proxy"],
        default="direct",
        help="direct = ws://localhost:<port>/ (default); "
             "proxy = ws://127.0.0.1:8889/proxy/<port>/ via jupyter-server-proxy "
             "(matches real-JupyterLab path; tests PR #375 fix)",
    )
    args = parser.parse_args()
    global NOTEBOOK
    NOTEBOOK = (ROOT / "scripts" /
                ("test_notebook_proxy.ipynb" if args.notebook == "proxy"
                 else "test_notebook.ipynb"))
    print(f"  → using notebook variant: {args.notebook} ({NOTEBOOK.name})", flush=True)
    _strip_outputs(NOTEBOOK)
    with jupyter_lab():
        return asyncio.run(run_main(args))


def _strip_outputs(path: Path) -> None:
    """Make runs hermetic: drop saved outputs before opening the notebook.

    JupyterLab autosaves outputs during a run. On the NEXT run those
    stale outputs boot Bonito sessions that point at the previous
    (dead) kernel — reconnect storms, watchdog banners, and enough
    Bonito global-state pollution to break the fresh run's round-trips.
    """
    nb = json.loads(path.read_text())
    dirty = False
    for cell in nb.get("cells", []):
        if cell.get("cell_type") == "code":
            if cell.get("outputs") or cell.get("execution_count") is not None:
                dirty = True
            cell["outputs"] = []
            cell["execution_count"] = None
    if dirty:
        path.write_text(json.dumps(nb, indent=1))
        print("  → stripped stale outputs from notebook", flush=True)


if __name__ == "__main__":
    sys.exit(main())
