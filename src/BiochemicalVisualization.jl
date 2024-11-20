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
include("core/representation.jl")
include("core/visualize.jl")

include("models/ball_and_stick.jl")
include("models/stick.jl")
include("models/van_der_waals.jl")

end # module BiochemicalVisualization
