struct Representation{T <: Real}
    primitives::Dict{String, AbstractVector{GeometryPrimitive{3, T}}}
    meta_data::AbstractVector{AbstractVector{Union{AbstractString, Int}}}
    colors::Dict{String, AbstractVector{AbstractString}}

    function Representation{T}(;
            primitives=Dict{String, Vector{GeometryPrimitive{3, T}}}(),
            meta_data=Vector{Vector{Union{String, Int}}}(),
            colors=Dict{String, Vector{String}}()) where {T}
        new(primitives, meta_data, colors)
    end
end

# defined in compat.jl
# MsgPack.msgpack_type(::Type{Cylinder{T}})       where {T} = MsgPack.StructType()
MsgPack.msgpack_type(::Type{Sphere{T}})         where {T} = MsgPack.StructType()
MsgPack.msgpack_type(::Type{Representation{T}}) where {T} = MsgPack.StructType()

# convenience constructors
_sphere(center::Vector3{T}, r::T) where {T<:Real} = Sphere{T}(Point3{T}(center...), r)
_cylinder(origin::Vector3{T}, extremity::Vector3{T}, radius::T) where {T<:Real} =
    Cylinder(Point3{T}(origin...), Point3{T}(extremity...), radius)

center(s::Sphere)   = s.center
center(c::Cylinder) = c.origin + 0.5 * (c.extremity - c.origin)
