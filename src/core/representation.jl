"""
    TriangleMesh{T}

Flat wire-friendly triangle mesh used by surface representations
(SAS, SES). Positions and normals are flat float arrays of length
`3*N` (xyz interleaved); `indices` is a flat array of length `3*F`
(triangle vertices interleaved); `vertex_colors` is one hex string
per vertex. This matches Babylon's `VertexData` layout on the JS
side, so building a mesh is one allocation per array.
"""
struct TriangleMesh{T <: Real}
    positions::Vector{T}
    normals::Vector{T}
    indices::Vector{Int32}
    vertex_colors::Vector{String}
end

MsgPack.msgpack_type(::Type{TriangleMesh{T}}) where {T} = MsgPack.StructType()

struct Representation{T <: Real}
    primitives::Dict{String, AbstractVector{GeometryPrimitive{3, T}}}
    meta_data::AbstractVector{AbstractVector{Union{AbstractString, Int}}}
    colors::Dict{String, AbstractVector{AbstractString}}
    # Per-primitive boolean flags (e.g. "cylinder_h_flags" marking which
    # bond halves involve a hydrogen, so the renderer can hide them when
    # the user toggles hydrogens off).
    flags::Dict{String, AbstractVector{Bool}}
    # Triangulated surface mesh (SAS / SES models). `nothing` for atom
    # models.
    mesh::Union{Nothing, TriangleMesh{T}}

    function Representation{T}(;
            primitives=Dict{String, Vector{GeometryPrimitive{3, T}}}(),
            meta_data=Vector{Vector{Union{String, Int}}}(),
            colors=Dict{String, Vector{String}}(),
            flags=Dict{String, Vector{Bool}}(),
            mesh=nothing) where {T}
        new(primitives, meta_data, colors, flags, mesh)
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

# Shared back-end for prepare_sas_model / prepare_ses_model. Calls the
# given `triangulate` closure (which routes to triangulate_sas /
# triangulate_ses in BiochemicalAlgorithms) and packs the result plus
# per-vertex colors into a `Representation`.
function _prepare_surface_model(
        ac::AbstractAtomContainer{T};
        triangulate,
        probe_radius,
        density,
        coloring::AbstractString,
        solid_color::AbstractString) where {T<:Real}
    # Surface algorithms in BiochemicalAlgorithms expect each atom to
    # carry a non-zero VdW radius; freshly loaded PDB atoms typically
    # have radius == 0, so fill them in from the element table. We only
    # touch atoms with zero radius (overwrite=false), so user-supplied
    # radii survive.
    assign_radii!(ac)

    pr = T(probe_radius)
    d  = T(density)
    mesh = triangulate(ac; pr=pr, d=d)

    n_verts = length(mesh.position)
    positions = Vector{T}(undef, 3 * n_verts)
    normals   = Vector{T}(undef, 3 * n_verts)
    @inbounds for i in 1:n_verts
        p = mesh.position[i]; nv = mesh.normal[i]
        positions[3i - 2] = p[1]; positions[3i - 1] = p[2]; positions[3i] = p[3]
        normals[3i - 2]   = nv[1]; normals[3i - 1]   = nv[2]; normals[3i]   = nv[3]
    end

    n_faces = length(mesh.faces)
    indices = Vector{Int32}(undef, 3 * n_faces)
    @inbounds for i in 1:n_faces
        f = mesh.faces[i]
        # Babylon/WebGL is 0-indexed; convert from Julia's 1-based faces.
        indices[3i - 2] = Int32(f[1] - 1)
        indices[3i - 1] = Int32(f[2] - 1)
        indices[3i]     = Int32(f[3] - 1)
    end

    vertex_colors = surface_vertex_colors(mesh.position, ac;
                                          method=coloring,
                                          solid_color=solid_color)

    Representation{T}(
        mesh = TriangleMesh{T}(positions, normals, indices, vertex_colors),
    )
end


# =============================================================================
# Scene composition — multiple representations rendered in a single Babylon
# scene. See docs/design/multi_representation.md.
# =============================================================================

"""
    DisplayedRepresentation

One entry in a `Scene`. Wraps a precomputed `Representation` with the
inputs that produced it (so the scene can rebuild the rep when the user
changes coloring / density / model via the menu), the kwarg state, and a
visibility flag.

Field order matches the wire format expected by the renderer.
"""
mutable struct DisplayedRepresentation{T<:Real}
    repr::Representation{T}
    source::AbstractAtomContainer
    type::String                  # one of VALID_MODEL_TYPES
    coloring::String              # one of SURFACE_COLOR_METHODS
    density::String               # one of DENSITY_LEVELS
    probe_radius::Real
    solid_color::String
    visible::Bool
    # Type-specific kwargs that don't fit the surface-model fields
    # above. Currently used by the backbone / ribbon / cartoon reps to
    # remember their BackboneConfig kwargs across a rebuild. Empty
    # NamedTuple by default; never serialized over the wire.
    backbone_kwargs::NamedTuple
end

# Back-compat constructor: existing call sites that pass the 8
# positional fields keep working; `backbone_kwargs` defaults to empty.
DisplayedRepresentation(repr::Representation{T}, source, type, coloring, density,
                        probe_radius, solid_color, visible) where {T} =
    DisplayedRepresentation{T}(repr, source, type, coloring, density,
                               probe_radius, solid_color, visible, NamedTuple())

MsgPack.msgpack_type(::Type{DisplayedRepresentation{T}}) where {T} = MsgPack.StructType()

"""
    Scene

Composable scene that holds an ordered list of representations plus
display-wide state (style, sizing, currently-active rep index).

Use the mutating `*!` variants (`ball_and_stick!`, `stick!`,
`van_der_waals!`, `sas!`, `ses!`) to add representations:

    scene = Scene()
    ball_and_stick!(scene, sys1)
    sas!(scene, sys2; coloring = "chain")
    scene

`Base.show` renders the scene via Bonito so returning a `Scene` from a
notebook cell displays it just like the legacy convenience functions.

`active` is a 1-based index into `representations` (or 0 when the scene
is empty) indicating which rep the Model / Color / Density menus drive.
Defaults to the most recently added rep.
"""
mutable struct Scene
    representations::Vector{DisplayedRepresentation}
    style::String
    width::String
    height::String
    active::Int
end

Scene(; style::AbstractString="default",
        width::AbstractString="80%",
        height::AbstractString="60%") =
    Scene(DisplayedRepresentation[], String(style), String(width), String(height), 0)

# Defer Base.show implementation to core/visualize.jl, where the Bonito
# render machinery lives.

# ---- helpers ----

"""
    set_active!(scene, i)

Make the i-th representation the target of the Model / Color / Density
menus. Must be in `1:length(scene.representations)` (or 0 if the scene is
empty).
"""
function set_active!(scene::Scene, i::Integer)
    n = length(scene.representations)
    (i == 0 && n == 0) || (1 ≤ i ≤ n) ||
        throw(ArgumentError("active index $i out of range 1:$n"))
    scene.active = Int(i)
    return scene
end

"""
    set_visible!(scene, i, on::Bool)

Hide or show the i-th representation without removing it from the scene.
"""
function set_visible!(scene::Scene, i::Integer, on::Bool)
    1 ≤ i ≤ length(scene.representations) ||
        throw(ArgumentError("visibility index $i out of range 1:$(length(scene.representations))"))
    scene.representations[i].visible = on
    return scene
end

"""
    Base.delete!(scene, i)

Remove the i-th representation. The active index is adjusted so it
continues to point at a valid rep (or 0 when the scene is empty).
"""
function Base.delete!(scene::Scene, i::Integer)
    1 ≤ i ≤ length(scene.representations) ||
        throw(ArgumentError("delete index $i out of range 1:$(length(scene.representations))"))
    deleteat!(scene.representations, i)
    n = length(scene.representations)
    if n == 0
        scene.active = 0
    elseif scene.active > n
        scene.active = n
    elseif scene.active == i && i > 1
        scene.active = i - 1
    end
    return scene
end

"""
    Base.empty!(scene)

Remove all representations from the scene.
"""
function Base.empty!(scene::Scene)
    empty!(scene.representations)
    scene.active = 0
    return scene
end

# Internal: append a freshly-built rep to the scene and bump `active` to
# point at it. Called from the mutating display functions in visualize.jl.
function _push_representation!(scene::Scene, dr::DisplayedRepresentation)
    push!(scene.representations, dr)
    scene.active = length(scene.representations)
    return scene
end
