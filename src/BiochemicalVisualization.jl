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
include("core/plain_mesh.jl")
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

# Make Bonito emit *path-relative* JupyterLab proxy URLs (no scheme,
# no host) so the rendered cell resolves the proxy endpoint against
# the page's own origin. Bonito's stock `jupyterlab_proxy_url`
# constructs an absolute URL using `IJulia.profile["ip"]` (typically
# `127.0.0.1`); if the user opens JupyterLab at `localhost:8888`, the
# WebSocket and HTTP fetches go cross-origin to `127.0.0.1:8888`, the
# JupyterLab auth cookie is dropped, and `jupyter-server-proxy`
# returns 403 with no visible explanation. Returning a path lets the
# browser fill in whatever scheme/host the user actually opened, so
# either `localhost` or `127.0.0.1` works without configuration.
function Bonito.jupyterlab_proxy_url(port::Integer)
    config = Bonito.jupyter_running_servers()
    base_url = isnothing(config) ? "/" : config[1]["base_url"]
    return string(base_url, "proxy/", port)
end

end # module BiochemicalVisualization
