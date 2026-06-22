module BiochemicalVisualization

using BiochemicalAlgorithms

using Bonito
using Colors
using GeometryBasics
using LinearAlgebra
using MsgPack
using Statistics

import GeometryBasics: Sphere, Cylinder

dist_path(parts...) = normpath(joinpath(@__DIR__, "..", "typescript", "dist", parts...))

include("compat.jl")
include("core/element_colors.jl")
include("core/element_colors_qutemol.jl")
include("core/element_vdw_radii.jl")
include("core/representation.jl")
include("core/visualize.jl")

include("models/ball_and_stick.jl")
include("models/quick_ses.jl")
include("models/stick.jl")
include("models/van_der_waals.jl")

end # module BiochemicalVisualization
