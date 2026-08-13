# Deploying the interactive viewer (for phones / remote browsers)

This runs the BiochemicalVisualization viewer inside JupyterLab so any
browser on your network — including an iPhone — can drive a **live** Julia
kernel: rotate, zoom, switch models, change opacity/coloring, all
round-tripping to Julia.

The browser only talks to JupyterLab's single port (**8888**);
`jupyter-server-proxy` tunnels to the per-kernel Bonito server *inside* the
container, so only one port is exposed and there's nothing else to wire up.

## Run it

```bash
# from the repository root
docker compose up --build
```

The first build is slow — it precompiles Julia + BiochemicalAlgorithms +
Bonito and bakes the cache into the image. Subsequent starts are fast.

Then open, on the same machine:

```
http://localhost:8888/lab?token=change-me
```

Open `example.ipynb` and run the cells.

> Change the token: edit `JUPYTER_TOKEN` in `docker-compose.yml` (default
> `change-me`).

> Change the port: the published host port defaults to **8888** and can be
> overridden with the `BCV_PORT` environment variable, e.g.
> `BCV_PORT=9999 docker compose up` (then browse to `:9999`). You can also
> put `BCV_PORT=9999` into an `.env` file next to `docker-compose.yml`.

## Reaching it from an iPhone

The phone is a *remote* browser, so it must reach the host and use proxy
mode (already set via `BCV_JUPYTER_PROXY=1`).

**Same Wi‑Fi (simplest).** Find the host's LAN IP (`ipconfig getifaddr en0`
on macOS) and browse to it from the phone:

```
http://192.168.1.42:8888/lab?token=change-me
```

`docker compose` already publishes `0.0.0.0:8888` (or your `BCV_PORT`),
so nothing else is needed beyond the two devices being on the same
network (and the host firewall allowing the port).

**Over the internet / away from home.** Put a tunnel in front of 8888:

- **Tailscale** (nicest): install on host and phone, browse to the host's
  tailnet IP — `http://100.x.y.z:8888/lab?token=…`.
- **cloudflared / ngrok**: `cloudflared tunnel --url http://localhost:8888`
  gives an HTTPS URL. Proxy mode uses page‑relative URLs, so the WebSocket
  upgrades to `wss://` automatically over HTTPS — no extra config.

## Notes & limits

- **Notebooks persist** in `deploy/notebooks/` on the host (mounted at
  `/work`). Add your own `.ipynb` there.
- **Always call `Page()`** once near the top (the example does). It ships
  the JS bundle once per notebook.
- **iOS Safari WebGL** handles small/medium structures well; a large SES
  surface (a whole receptor) can be slow or hit mobile‑GPU memory limits.
- **BiochemicalAlgorithms** is pulled from the registry (0.7.x). If you
  need unreleased local changes to that package, add a `[sources]` entry
  and copy the checkout into the build context.
- **Auth**: this uses a static Jupyter token for a stable URL. For anything
  beyond a trusted LAN, front it with TLS (a tunnel above) and a strong
  token, or add a reverse proxy with real auth.
