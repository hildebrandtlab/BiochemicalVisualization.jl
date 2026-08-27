# MeshBuilder — the in-memory scratch type the backbone / ribbon /
# cartoon pipeline builds geometry into. **Internal to BCV** (not
# exported); the Bonito wire format is `TriangleMesh` in
# representation.jl, produced via the `TriangleMesh(::MeshBuilder)`
# adapter at the bottom of this file.
#
# Why a separate type vs. building straight into TriangleMesh: the
# build phase wants column-view slicing into 3×N matrices, 1-based Int
# index arithmetic to match Julia loops, and cheap NTuple{3,Int}
# colors that don't need a hex-encode per cross-section vertex. The
# wire format wants flat Vector{T}, 0-based Int32 indices, and one
# hex string per vertex (for direct Babylon ingestion). Using one
# layout for building and another for emission keeps the algorithm
# code readable and the wire format compact.
#
# Adapted from `src/helpers/meshes/PlainMesh.jl` and
# `src/helpers/meshes/MeshHelpers.jl` in Dorothee Brohl's fork (where
# it was named `PlainMesh`); the original's `Meshes.SimpleMesh`
# constructors and debug `local_frame_mesh` / `local_arrow_mesh`
# helpers are dropped, since they pulled in the Meshes.jl rendering
# stack which BCV doesn't depend on.

"""
    MeshBuilder{T}

Internal scratch triangle-mesh type used while building backbone /
ribbon / cartoon geometry. Three rows per matrix, one column per
vertex / face. Indices in `connections` are 1-based.

Not exported; not part of the public BCV API. End-user mesh
representations cross the wire as `TriangleMesh` (see
[`Representation`](@ref)).
"""
mutable struct MeshBuilder{T<:Real}
    vertices::Matrix{T}                  # 3 × N
    normals::Matrix{T}                   # 3 × N
    connections::Matrix{Int}             # 3 × F, 1-based triangle vertex indices
    colors::Vector{NTuple{3, Int}}       # length N
end

nvertices(m::MeshBuilder)    = size(m.vertices, 2)
nconnections(m::MeshBuilder) = size(m.connections, 2)

Base.:(==)(a::MeshBuilder{T}, b::MeshBuilder{U}) where {T, U} =
    T == U && a.vertices == b.vertices && a.normals == b.normals &&
    a.connections == b.connections && a.colors == b.colors

"""
    color!(mesh, new_color)

Overwrite every vertex color of `mesh` with `new_color`. Used after
the geometry is built when the rep's coloring mode produces one
solid hue per rep (e.g. `Color.UNIFORM`).
"""
function color!(mesh, new_color::NTuple{3, Int})
    for i in eachindex(mesh.colors)
        mesh.colors[i] = new_color
    end
end

# ----- Cross-section writers (one per backbone shape) -----

"""
    create_circle_in_local_frame!(points, normals, center, ey, ez, resolution, radius)

Write `resolution` evenly-spaced points lying on the circle of radius
`radius` centered at `center` in the plane spanned by unit vectors
`ey`, `ez`. Vertex normals point outward radially. `points` and
`normals` are 3-row matrices; columns 1..resolution are written.
"""
function create_circle_in_local_frame!(
        points::AbstractArray{T}, normals::AbstractArray{T},
        center::AbstractArray{T},
        local_y::AbstractArray{T}, local_z::AbstractArray{T},
        resolution::Int, radius) where T
    for (i, α) in enumerate(range(0, 2 * π; length=resolution + 1)[1:end - 1])
        @. points[:, i]  = center + radius * cos(α) * local_y + radius * sin(α) * local_z
        @. normals[:, i] =          radius * cos(α) * local_y + radius * sin(α) * local_z
        normalize_col!(normals, i)
    end
end

"""
    create_ellipse_in_local_frame!(points, normals, center, ey, ez,
                                   resolution, half_width, half_height)

Like `create_circle_in_local_frame!` but with separate half-axes along
`ey` and `ez`. Used for the ribbon and helix cross-sections.
"""
function create_ellipse_in_local_frame!(
        points::AbstractArray{T}, normals::AbstractArray{T},
        center::AbstractArray{T},
        local_y::AbstractArray{T}, local_z::AbstractArray{T},
        resolution::Int, half_width, half_height) where T
    for (i, α) in enumerate(range(0, 2 * π; length=resolution + 1)[1:end - 1])
        @. points[:, i]  = center + half_width * cos(α) * local_y + half_height * sin(α) * local_z
        @. normals[:, i] =          half_width * cos(α) * local_y + half_height * sin(α) * local_z
        normalize_col!(normals, i)
    end
end

"""
    create_rectangle_in_local_frame!(points, normals, center, ey, ez,
                                     resolution, half_width, half_height)

Write `resolution` points along the perimeter of a rectangle of half-axes
`half_width` along `ey`, `half_height` along `ez`. The four corners are
guaranteed sampling points; remaining samples distribute along the four
edges (long edges get ~⅔ of them, short edges ~⅓). Used as the
cross-section of cartoon strand arrows.

If `resolution < 4` (i.e. not enough samples to keep all four corners)
the function falls back to an ellipse, which avoids a degenerate
rectangle.
"""
function create_rectangle_in_local_frame!(
        points::AbstractArray{T}, normals::AbstractArray{T},
        center::AbstractArray{T},
        local_y::AbstractArray{T}, local_z::AbstractArray{T},
        resolution::Int, half_width, half_height) where T
    if resolution < 4
        create_ellipse_in_local_frame!(points, normals, center, local_y, local_z,
                                       resolution, half_width, half_height)
        return
    end

    # 4 corners + the remaining samples split into five edge sections
    # (A..E) using the ratios from BALLView's ribbon cross-section.
    remaining_points = resolution - 4
    ratio = 1 / 6
    short_sides = Int(ceil(remaining_points * ratio))
    long_sides  = remaining_points - short_sides

    B  = Int(floor(long_sides  / 2));   D  = long_sides  - B
    C  = Int(floor(short_sides / 2));   AE = short_sides - C
    A  = Int(floor(AE / 2));            E  = AE - A

    half_width_vector  = half_width  * local_y
    half_height_vector = half_height * local_z
    a = 1

    for y in range(0, 1, A + 2)[2:end - 1]
        @. points[:, a]  = center + half_width_vector + y * half_height_vector
        normals[:, a]   .= local_y
        a += 1
    end
    @. points[:, a]  = center + half_width_vector + half_height_vector
    normals[:, a]   .= local_y .+ local_z
    normalize_col!(normals, a); a += 1

    for x in range(1, -1, B + 2)[2:end - 1]
        @. points[:, a]  = center + x * half_width_vector + half_height_vector
        normals[:, a]   .= local_z
        a += 1
    end
    @. points[:, a]  = center - half_width_vector + half_height_vector
    normals[:, a]   .= -local_y .+ local_z
    normalize_col!(normals, a); a += 1

    for y in range(1, -1, C + 2)[2:end - 1]
        @. points[:, a]  = center - half_width_vector + y * half_height_vector
        normals[:, a]   .= -local_y
        a += 1
    end
    @. points[:, a]  = center - half_width_vector - half_height_vector
    normals[:, a]   .= -local_y .- local_z
    normalize_col!(normals, a); a += 1

    for x in range(-1, 1, D + 2)[2:end - 1]
        @. points[:, a]  = center + x * half_width_vector - half_height_vector
        normals[:, a]   .= -local_z
        a += 1
    end
    @. points[:, a]  = center + half_width_vector - half_height_vector
    normals[:, a]   .= local_y .- local_z
    normalize_col!(normals, a); a += 1

    for y in range(-1, 0, E + 2)[2:end - 1]
        @. points[:, a]  = center + half_width_vector + y * half_height_vector
        normals[:, a]   .= local_y
        a += 1
    end
end

# ----- Mesh stitching + merging -----

"""
    merge_meshes(meshes::AbstractVector{MeshBuilder{T}}) -> MeshBuilder{T}

Concatenate multiple `MeshBuilder`s into one. The triangle indices of
each input are shifted by the cumulative vertex count of the preceding
inputs so the result references the right rows of the combined
vertex array.
"""
function merge_meshes(meshes::AbstractVector{MeshBuilder{T}}) where T
    points, normals, connects, colors = merge_meshes(
        map(m -> m.vertices,    meshes),
        map(m -> m.normals,     meshes),
        map(m -> m.connections, meshes),
        map(m -> m.colors,      meshes))
    return MeshBuilder{T}(points, normals, connects, colors)
end

function merge_meshes(vertex_list::AbstractVector{Matrix{T}},
                      normal_list::AbstractVector{Matrix{T}},
                      connection_list::AbstractVector{Matrix{Int}},
                      color_list::AbstractVector{X}) where {T, Y <: Union{String, NTuple{3, Int}}, X <: AbstractVector{Y}}
    num_points   = sum(map(m -> size(m, 2), vertex_list))
    num_connects = sum(map(m -> size(m, 2), connection_list))

    points   = Matrix{T}(undef, 3, num_points)
    normals  = Matrix{T}(undef, 3, num_points)
    connects = Matrix{Int}(undef, 3, num_connects)
    colors   = Vector{Y}(undef, num_points)

    point_count      = 0
    connection_count = 0
    for (v, n, con, col) in zip(vertex_list, normal_list, connection_list, color_list)
        num = size(v, 2)
        points[:, point_count + 1:point_count + num]   .= v
        normals[:, point_count + 1:point_count + num]  .= n
        colors[point_count + 1:point_count + num]      .= col

        connects[:, connection_count + 1:connection_count + size(con, 2)] .= con .+ point_count

        point_count      += num
        connection_count += size(con, 2)
    end
    return points, normals, connects, colors
end

"""
    add_faces_to_tube_mesh!(tube_mesh, resolution, ncircles)

Stitch a sequence of `ncircles` cross-section rings (each with
`resolution` vertices) into a closed tube. Assumes the final two
vertices of `tube_mesh.vertices` are the start cap and end cap points
respectively. Allocates `tube_mesh.connections`.
"""
function add_faces_to_tube_mesh!(tube_mesh::MeshBuilder{T}, resolution::Int, ncircles::Int) where T
    if ncircles <= 0 || size(tube_mesh.vertices, 2) <= 0
        return
    end

    # connections between consecutive rings (two triangles per quad,
    # so 2*resolution per gap) plus the two cap fans (2*resolution).
    num_faces = (ncircles - 1) * resolution * 2 + 2 * resolution
    tube_mesh.connections = Matrix{Int}(undef, 3, num_faces)

    offset       = 0
    connection_i = 1
    prev_indices = nothing
    for _ in 1:ncircles
        current_indices = (offset + 1):(offset + resolution)
        shift_buffer = Vector{Int}(undef, resolution)
        if prev_indices !== nothing
            @assert length(current_indices) == length(prev_indices)

            tube_mesh.connections[1, connection_i:connection_i + resolution - 1] = current_indices'
            tube_mesh.connections[2, connection_i:connection_i + resolution - 1] = prev_indices'
            circshift!(shift_buffer, prev_indices, 1)
            tube_mesh.connections[3, connection_i:connection_i + resolution - 1] = shift_buffer'
            connection_i += resolution

            tube_mesh.connections[1, connection_i:connection_i + resolution - 1] = current_indices'
            tube_mesh.connections[2, connection_i:connection_i + resolution - 1] = shift_buffer'
            circshift!(shift_buffer, current_indices, 1)
            tube_mesh.connections[3, connection_i:connection_i + resolution - 1] = shift_buffer'
            connection_i += resolution
        end

        prev_indices = current_indices
        offset += resolution
    end

    # Cap fans: each cap is a triangle fan from the cap point to its
    # adjacent ring's vertices.
    start_point_index = size(tube_mesh.vertices, 2) - 1
    tube_mesh.connections[1, connection_i:connection_i + resolution - 1] = collect(1:resolution)'
    tube_mesh.connections[2, connection_i:connection_i + resolution - 1] = circshift(1:resolution, 1)'
    tube_mesh.connections[3, connection_i:connection_i + resolution - 1] = repeat([start_point_index], resolution)'
    connection_i += resolution

    tube_mesh.connections[1, connection_i:connection_i + resolution - 1] = collect(start_point_index - resolution:start_point_index - 1)'
    tube_mesh.connections[2, connection_i:connection_i + resolution - 1] = circshift(start_point_index - resolution:start_point_index - 1, 1)'
    tube_mesh.connections[3, connection_i:connection_i + resolution - 1] = repeat([start_point_index + 1], resolution)'
end

# ----- MeshBuilder -> TriangleMesh adapter (wire format) -----

"""
    TriangleMesh(::MeshBuilder)

Convert a `MeshBuilder` (3×N matrices, 1-based Int indices, RGB tuple
colors) into the flat wire-format `TriangleMesh` the JS renderer
expects (flat `Vector{T}` of length 3N, 0-based `Int32` indices,
per-vertex hex strings).
"""
function TriangleMesh(m::MeshBuilder{T}) where T<:Real
    n_verts = size(m.vertices, 2)
    n_faces = size(m.connections, 2)

    positions = Vector{T}(undef, 3 * n_verts)
    normals   = Vector{T}(undef, 3 * n_verts)
    @inbounds for i in 1:n_verts
        positions[3i - 2] = m.vertices[1, i]
        positions[3i - 1] = m.vertices[2, i]
        positions[3i]     = m.vertices[3, i]
        normals[3i - 2]   = m.normals[1, i]
        normals[3i - 1]   = m.normals[2, i]
        normals[3i]       = m.normals[3, i]
    end

    indices = Vector{Int32}(undef, 3 * n_faces)
    @inbounds for i in 1:n_faces
        # MeshBuilder stores 1-based connections; the wire format is
        # 0-based to match Babylon's VertexData layout.
        indices[3i - 2] = Int32(m.connections[1, i] - 1)
        indices[3i - 1] = Int32(m.connections[2, i] - 1)
        indices[3i]     = Int32(m.connections[3, i] - 1)
    end

    vertex_colors = Vector{String}(undef, n_verts)
    @inbounds for i in 1:n_verts
        vertex_colors[i] = rgb_to_hex(m.colors[i]; prefix="#")
    end

    return TriangleMesh{T}(positions, normals, indices, vertex_colors)
end
