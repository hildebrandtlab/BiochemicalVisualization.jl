# Sphere/Cylinder type registration for MsgPack. Cylinder was renamed
# from Cylinder3 in GeometryBasics 0.5; we register whichever is defined.
MsgPack.msgpack_type(::Type{Sphere{T}}) where {T} = MsgPack.StructType()

@static if isdefined(GeometryBasics, :Cylinder3)
    MsgPack.msgpack_type(::Type{Cylinder3{T}}) where {T} = MsgPack.StructType()
else
    MsgPack.msgpack_type(::Type{Cylinder{T}}) where {T} = MsgPack.StructType()
end
