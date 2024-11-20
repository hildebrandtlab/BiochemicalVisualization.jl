# required for GeometryBasics <0.5
@static if isdefined(GeometryBasics, :Cylinder3)
    MsgPack.msgpack_type(::Type{Cylinder3{T}}) where {T} = MsgPack.StructType()
else
    MsgPack.msgpack_type(::Type{Cylinder{T}}) where {T} = MsgPack.StructType()
end
