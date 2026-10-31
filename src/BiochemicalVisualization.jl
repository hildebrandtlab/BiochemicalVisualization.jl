module BiochemicalVisualization

using BiochemicalAlgorithms

using Bonito
using Colors
using GeometryBasics
using LinearAlgebra
using MsgPack
using Statistics

import GeometryBasics: Sphere, Cylinder

asset_path(parts...) = normpath(joinpath(@__DIR__, "..", "assets", parts...))

include("compat.jl")
include("core/element_colors.jl")
include("core/element_colors_qutemol.jl")
include("core/element_vdw_radii.jl")
include("core/surface_coloring.jl")
include("core/backbone_helpers.jl")
include("core/point_filter.jl")
# Splines: concrete types first, helper functions last (the helpers
# reference the types).
include("core/splines/Linear.jl")
include("core/splines/CatmullRom.jl")
include("core/splines/CubicB.jl")
include("core/splines/SplineHelper.jl")
include("core/frame_construction.jl")
include("core/representation.jl")
include("core/mesh_builder.jl")
include("core/visualize.jl")

include("models/ball_and_stick.jl")
include("models/quick_ses.jl")
include("models/sas.jl")
include("models/ses.jl")
include("models/stick.jl")
include("models/van_der_waals.jl")
# backbone_config (BackboneConfig + palette tables) must precede
# backbone.jl, which references BackboneConfig in dispatch.
include("models/backbone_config.jl")
include("models/backbone.jl")

# NOTE: we used to register an atexit hook to close the Bonito server
# on kernel shutdown so the next kernel could reclaim the same port.
# Bonito >=4.x already does this — its own `__init__` registers
# `cleanup_globals` via atexit, and that path is exercised at
# precompile time on Julia 1.11+, so the JIT cost is paid up front.
# A duplicate hook here ran the same close path WITHOUT precompilation
# coverage and triggered an LLVM-pass crash when JupyterLab's shutdown
# timeout fired mid-JIT. Leave the cleanup to Bonito.

# By default Bonito routes everything in JupyterLab through
# `jupyter-server-proxy` (it sees `JPY_SESSION_NAME` in the env and
# calls `jupyterlab_proxy_url`). That hop is only NECESSARY for remote
# setups (JupyterHub on another host) where the browser can't reach
# Bonito's own port — only the forwarded :8888 is reachable. For a
# *local* JupyterLab everything is on `localhost`, so the browser can
# open `ws://localhost:<bonito-port>/` directly. Bonito already
# supports this: when `server.proxy_url` is empty, `relative_url` /
# `online_url` fall back to `local_url`, which emits a direct
# `http://localhost:<port>/...` (see Bonito HTTPServer/implementation.jl
# local_url / online_url).
#
# We default to DIRECT (no proxy): it drops the jupyter-server-proxy
# dependency entirely and removes the proxy hop, which is where the
# interactive back-channel WebSocket was unreliable. Returning "" from
# `jupyterlab_proxy_url` makes Bonito's `get_server` set
# `server.proxy_url = ""` → direct local URLs.
#
# Browsers don't enforce same-origin on WebSockets, so a page served
# from `localhost:8888` can open `ws://localhost:<port>/` without CORS
# trouble. The one case where direct fails is HTTPS JupyterLab (a
# `ws://` from an `https://` page is blocked as mixed content) or a
# genuinely remote kernel — for those, set `BCV_JUPYTER_PROXY=1` to
# restore the path-relative proxy URL.
function Bonito.jupyterlab_proxy_url(port::Integer)
    if haskey(ENV, "BCV_JUPYTER_PROXY")
        # Opt-in proxy mode for remote / HTTPS JupyterLab. Path-relative
        # so the browser resolves it against the page's own origin
        # (works whether the user opened localhost or 127.0.0.1).
        config = Bonito.jupyter_running_servers()
        base_url = isnothing(config) ? "/" : config[1]["base_url"]
        return string(base_url, "proxy/", port)
    end
    # Direct/local mode (default): empty string → Bonito emits
    # ws://localhost:<port>/ and the browser connects straight to the
    # Bonito server with no proxy.
    return ""
end

function __init__()
    # Ask the OS for a fresh ephemeral port for this kernel. Bonito's
    # default is a fixed 9384 with sequential fallback (try_listen()
    # catches UV_EADDRINUSE and increments). That works for the first
    # kernel but degrades badly on a workstation that accumulates
    # zombie IJulia processes — each kernel that crashes (force-kill,
    # OOM, heartbeat timeout) leaves a Julia process alive holding its
    # Bonito port, and the next kernel has to walk the fallback ladder
    # past every zombie. `listen_port = 0` lets HTTP.listen! bind an
    # OS-assigned port directly (requires Bonito >= 5; older try_listen
    # returned the literal 0 and emitted dead `:0` URLs, which is why
    # this used to be a pre-bind-and-close Sockets dance).
    Bonito.configure_server!(listen_port = 0)

    # Asset serving: leave Bonito on its IJulia default, `NoServer`.
    # NoServer inlines every asset into the cell HTML. That's exactly
    # what makes the interactive back-channel work in JupyterLab: the
    # session bootstrap and the modules it depends on (notably the
    # `Websocket` module that opens the back-channel socket) are
    # delivered inline and run immediately. Under `HTTPAssetServer`
    # those are fetched by URL/processed via a path JupyterLab's output
    # renderer doesn't drive to completion, the session WebSocket never
    # opens, and `notify()` from the sliders/menu reaches nothing — a
    # dead UI. (Two upstream Bonito bugs underlay this; 5.0 fixed the
    # missing `Websocket` module load, but the session-bootstrap script
    # still isn't executed by JupyterLab's output renderer under
    # HTTPAssetServer — see the project's upstream-PR notes.)
    #
    # NoServer's only downside is that it would base64-inline our ~7 MB
    # JS bundle into the first scene cell (~12.5 MB of notebook output →
    # the browser stalls). We avoid that WITHOUT leaving NoServer by
    # serving just that one bundle from a stable HTTP route and importing
    # it by URL; everything else stays inlined. See `_visualize()` in
    # core/visualize.jl. Net: first scene cell ~280 KB, back-channel
    # alive.
end

end # module BiochemicalVisualization
