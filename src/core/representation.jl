struct Representation{T <: Real}
    primitives::Dict{String, AbstractVector{GeometryPrimitive{3, T}}}
    meta_data::AbstractVector{AbstractVector{Union{AbstractString, Int}}}
    colors::Dict{String, AbstractVector{AbstractString}}
    # Per-primitive boolean flags (e.g. "cylinder_h_flags" marking which
    # bond halves involve a hydrogen, so the renderer can hide them when
    # the user toggles hydrogens off).
    flags::Dict{String, AbstractVector{Bool}}

    function Representation{T}(;
            primitives=Dict{String, Vector{GeometryPrimitive{3, T}}}(),
            meta_data=Vector{Vector{Union{String, Int}}}(),
            colors=Dict{String, Vector{String}}(),
            flags=Dict{String, Vector{Bool}}()) where {T}
        new(primitives, meta_data, colors, flags)
    end
end

# Sphere/Cylinder MsgPack registrations live in compat.jl (version-conditional).
MsgPack.msgpack_type(::Type{Representation{T}}) where {T} = MsgPack.StructType()

# convenience constructors
_sphere(center::Vector3{T}, r::T) where {T<:Real} = Sphere{T}(Point3{T}(center...), r)
_cylinder(origin::Vector3{T}, extremity::Vector3{T}, radius::T) where {T<:Real} =
    Cylinder(Point3{T}(origin...), Point3{T}(extremity...), radius)

_center(s::Sphere)   = s.center
_center(c::Cylinder) = c.origin + 0.5 * (c.extremity - c.origin)

# Per-atom metadata sent to the renderer. The renderer indexes into this
# vector positionally (see typescript/rendering.ts), so the order matters.
_atom_metadata(at) = [
    at.name,
    String(Symbol(at.element)),
    at.idx,
    isnothing(at.chain_idx)    ? "N/A" : at.chain_idx,
    isnothing(at.fragment_idx) ? "N/A" : at.fragment_idx,
]
