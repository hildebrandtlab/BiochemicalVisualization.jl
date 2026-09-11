"""Headless regression check for per-rep transparency.

Loads the BUILT bundle (typescript/dist) into a bare HTML page — no
Julia, no Jupyter — feeds it a synthetic SES-style surface mesh, and
counts rendered (non-background) pixels at alpha = 1.0 / 0.99 / 0.5.

Guards against the Babylon-9.12 class of bug where any alpha < 1 made
the whole representation vanish (needDepthPrePass's color pass failed
the depth test against its own pre-pass depths).

Usage:
    .venv/bin/python3 scripts/alpha_check/check.py [path/to/bundle.js]

Exit 0 = alpha behaves; non-zero with a report otherwise.
"""
import asyncio, http.server, socketserver, sys, threading
from pathlib import Path

from playwright.async_api import async_playwright

DIR = Path(__file__).resolve().parent
REPO = DIR.parent.parent
BUNDLE_FILE = Path(sys.argv[1]) if len(sys.argv) > 1 else \
    REPO / "typescript" / "dist" / "biochemicalvisualization.js"
PORT = 8977


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        if path.lstrip("/").startswith("biochemicalvisualization"):
            return str(BUNDLE_FILE)
        return str(DIR / path.lstrip("/"))

    def log_message(self, *a):
        pass


async def main():
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("127.0.0.1", PORT), Handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()

    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        page = await browser.new_page(viewport={"width": 950, "height": 550})
        errors: list[str] = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        await page.goto(f"http://127.0.0.1:{PORT}/index.html")
        await page.wait_for_function("() => window.__mounted", timeout=30_000)

        shots = Path(sys.argv[2]) if len(sys.argv) > 2 else None

        async def measure(alpha: float, ssao: int) -> int:
            await page.evaluate(f"() => window.__send({alpha}, {ssao})")
            await asyncio.sleep(1.5)  # let a few frames render
            if shots:
                shots.mkdir(parents=True, exist_ok=True)
                await page.screenshot(path=str(shots / f"alpha_{alpha}_ssao{ssao}.png"), clip={"x": 0, "y": 0, "width": 620, "height": 480})
            n = await page.evaluate("""
                () => {
                    const c = document.querySelector('canvas');
                    const gl = c.getContext('webgl2') || c.getContext('webgl');
                    const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
                    const px = new Uint8Array(w * h * 4);
                    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
                    let n = 0;
                    for (let i = 0; i < px.length; i += 4) {
                        if (px[i] > 25 || px[i+1] > 25 || px[i+2] > 25) n++;
                    }
                    return n;
                }
            """)
            print(f"  alpha={alpha:<5} ssao={ssao}  colored_pixels={n}")
            return n

        # ssao_mode 2 mirrors what Julia's set-render-mode sends on mount.
        opaque = await measure(1.0, 2)
        p99    = await measure(0.99, 2)
        p50    = await measure(0.5, 2)

        await browser.close()
    srv.shutdown()

    failures = []
    if opaque < 5000:
        failures.append(f"opaque render too small ({opaque}px) — harness broken?")
    if p99 < 0.9 * opaque:
        failures.append(f"alpha=0.99 lost pixels ({p99} vs {opaque} opaque) — the vanish bug")
    if p50 < 0.5 * opaque:
        failures.append(f"alpha=0.5 lost pixels ({p50} vs {opaque} opaque)")
    for e in errors[:5]:
        failures.append(f"page error: {e[:200]}")

    if failures:
        print("FAIL:")
        for f in failures:
            print(f"  - {f}")
        return 1
    print("alpha check OK")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
