# Backbone / ribbon / cartoon entry point. Adapted from
# `src/models/backbone/backbone.jl` in Dorothee Brohl's fork (the
# 613-line "all three preparers share one pipeline" file). The
# algorithm itself is unchanged; the adaptations are concentrated in
# this header block.
#
# Translations from the fork's API:
#   * `BiochemicalAlgorithms.SecondaryStructure.NONE/HELIX/SHEET`
#     → `SecondaryStructureElement.Coil/Helix/Strand`
#   * `Color.UNIFORM/CHAIN/RAINBOW/SECONDARY_STRUCTURE/RESIDUE/ELEMENT`
#     → Symbols `:uniform/:chain/:rainbow/:secondary_structure/:residue/:element`
#     (declared in src/models/backbone_config.jl)
#   * `BackboneType.{BACKBONE,RIBBON,CARTOON}` → Symbols
#     `:backbone/:ribbon/:cartoon`
#   * `Spline.{LINEAR,CATMULL_ROM,CUBIC_B}` → `:linear/:catmull_rom/:cubic_b`
#   * `Frame.{RMF,SECOND_SPLINE}` → `:rmf/:second_spline`
#   * `Filter.{NONE,ANGLE}` → `:none/:angle`
#   * `Symbol(:N_TERMINAL) ∈ frag.flags` → `is_n_terminal(frag)` /
#     `is_c_terminal(frag)` (current BCA exports these as helpers).
#   * `Representation(spline_mesh)` → `Representation{T}(mesh =
#     TriangleMesh(spline_mesh))` (current's wire-format type, with
#     conversion from PlainMesh handled in src/core/plain_mesh.jl).
#   * `handle_multichain_model` now returns a merged PlainMesh per
#     chain and lets the system entry wrap it once. The fork's
#     per-chain `Representation` merging is gone with `Representation`'s
#     structural changes.
#   * `log_info(...)` → `@debug ...`
#
# The cartoon SS fallback (auto-running `predict_secondary_structure!`
# when no SS is assigned) lives at the bottom of this file.

export prepare_backbone_model, prepare_ribbon_model, prepare_cartoon_model

# ----- small utilities -----

"""
    insert_sorted!(array, elem)

Insert `elem` into a sorted-ascending vector at the correct position so
the vector remains sorted. Used by the spline-filter step to inject
"don't-filter-me" indices.
"""
function insert_sorted!(array, elem)
    index = searchsortedfirst(array, elem)
    insert!(array, index, elem)
end

"""
    _check_config!(config::BackboneConfig)

Validate a `BackboneConfig` in place. Throws `ArgumentError` for the
combinations the algorithm doesn't handle.
"""
function _check_config!(config::BackboneConfig)
    config.tube_radius > 0 ||
        throw(ArgumentError("tube_radius must be > 0"))
    config.resolution_along >= 0.7 ||
        throw(ArgumentError("resolution_along must be >= 0.7"))
    config.resolution_cross >= 3 ||
        throw(ArgumentError("resolution_cross must be >= 3 " *
                            "(need at least three vertices per cross-section)"))
    config.color in BACKBONE_COLOR_METHODS ||
        throw(ArgumentError("color must be one of $BACKBONE_COLOR_METHODS, got $(config.color)"))
    config.color != :element ||
        throw(ArgumentError("backbone-based models cannot be colored by element " *
                            "(no per-atom geometry); use :secondary_structure or :residue"))
    config.backbone_type in BACKBONE_TYPES ||
        throw(ArgumentError("backbone_type must be one of $BACKBONE_TYPES, got $(config.backbone_type)"))
    config.spline in BACKBONE_SPLINES ||
        throw(ArgumentError("spline must be one of $BACKBONE_SPLINES, got $(config.spline)"))
    config.frame in BACKBONE_FRAMES ||
        throw(ArgumentError("frame must be one of $BACKBONE_FRAMES, got $(config.frame)"))
    config.filter in BACKBONE_FILTERS ||
        throw(ArgumentError("filter must be one of $BACKBONE_FILTERS, got $(config.filter)"))
    !(config.control_point_strategy == :c_alpha && config.frame == :second_spline) ||
        throw(ArgumentError("frame=:second_spline requires control_point_strategy=:mid_points"))
    config
end

# ----- SS / arrow helpers -----

"""
    get_ss_count(sample_indices, residue_info_dict)

Count secondary-structure *runs* in a sample-mapping vector — each
contiguous run of identical SS values counts once. Used to size the
cartoon transition-point arrays before the actual geometry pass.
"""
function get_ss_count(sample_indices, residue_info_dict)
    ss_count = Dict{SecondaryStructureType, Int}(
        SecondaryStructureElement.Coil   => 0,
        SecondaryStructureElement.Helix  => 0,
        SecondaryStructureElement.Strand => 0,
    )

    prev_ss = nothing
    for idx in sample_indices
        curr_ss = residue_info_dict[idx][2]
        # Collapse Turn / Unknown into Coil for cartoon-purposes counting.
        curr_ss = (curr_ss == SecondaryStructureElement.Turn ||
                   curr_ss == SecondaryStructureElement.Unknown) ?
                   SecondaryStructureElement.Coil : curr_ss
        if curr_ss != prev_ss
            ss_count[curr_ss] += 1
            prev_ss = curr_ss
        end
    end
    return ss_count
end

"""
    compute_frame_widths(fragment_list, sample_to_residue_indices, residue_info_dict)
        -> (rectangle_widths, arrow_starts, arrow_frame_indices, n_to_c)

Find beta-strand ends and emit the per-frame width multipliers that
produce arrow-head tapers in cartoon mode. The arrowhead always points
towards the C-terminus, so we first determine whether the fragments
are listed N→C or C→N.
"""
function compute_frame_widths(fragment_list::AbstractVector,
                              sample_to_residue_indices,
                              residue_info_dict::Dict{Int, Tuple{String, SecondaryStructureType}})
    rectangle_widths::Vector{Float64}    = []
    arrow_starts::Vector{Int}            = []
    arrow_frame_indices::Vector{Int}     = []

    filtered_fragment_list = filter(is_amino_acid, fragment_list)
    # Orientation: arrow heads point towards the C-terminus.
    if is_n_terminal(filtered_fragment_list[1]) && is_c_terminal(filtered_fragment_list[end])
        n_to_c = true
    elseif is_n_terminal(filtered_fragment_list[end]) && is_c_terminal(filtered_fragment_list[1])
        n_to_c = false
    else
        # Fall back to fragment-id ordering if termini aren't flagged.
        @debug "compute_frame_widths: no N/C terminal flags, assuming N→C"
        n_to_c = true
    end

    # For each strand: find the last residue and record its idx so the
    # cross-section width can taper through it.
    prev_idx = nothing
    prev_ss = nothing
    arrow_fragment_indices = []

    fragment_idx_list_from_frames = unique(sample_to_residue_indices)
    for current_fragment_idx in fragment_idx_list_from_frames
        current_ss = residue_info_dict[current_fragment_idx][2]

        if n_to_c && prev_ss !== nothing &&
                prev_ss    == SecondaryStructureElement.Strand &&
                current_ss != SecondaryStructureElement.Strand
            push!(arrow_fragment_indices, prev_idx)
        end
        if !n_to_c &&
                prev_ss    != SecondaryStructureElement.Strand &&
                current_ss == SecondaryStructureElement.Strand
            push!(arrow_fragment_indices, current_fragment_idx)
        end
        prev_idx = current_fragment_idx
        prev_ss  = current_ss
    end
    if n_to_c && prev_ss == SecondaryStructureElement.Strand   # last strand reaches chain end
        push!(arrow_fragment_indices, prev_idx)
    end

    # Walk the sample mapping, distribute taper widths across the
    # frames that belong to each arrowhead residue.
    frames_in_residue_count = 0
    prev_res_idx = sample_to_residue_indices[1]
    a = 1
    while a <= length(sample_to_residue_indices)
        res_idx       = sample_to_residue_indices[a]
        is_last_frame = a == length(sample_to_residue_indices)
        if res_idx != prev_res_idx || is_last_frame
            if is_last_frame
                frames_in_residue_count += 1
            end
            if frames_in_residue_count >= 2 &&
                    (prev_res_idx ∈ arrow_fragment_indices ||
                     (is_last_frame && res_idx ∈ arrow_fragment_indices))
                num_arrow   = max(2, Int(round(frames_in_residue_count * 2 / 3)))
                num_uniform = frames_in_residue_count - num_arrow

                uniforms = repeat([1], num_uniform)
                arrow    = collect(range(1.5, 0, num_arrow))
                if n_to_c
                    append!(arrow_frame_indices,
                            length(rectangle_widths) + num_uniform + 1:
                            length(rectangle_widths) + num_uniform + num_arrow)
                    push!(arrow_starts, length(rectangle_widths) + num_uniform + 1)
                    append!(rectangle_widths, uniforms, arrow)
                else
                    append!(arrow_frame_indices,
                            length(rectangle_widths) + 1:
                            length(rectangle_widths) + num_arrow)
                    push!(arrow_starts, length(rectangle_widths) + num_arrow)
                    append!(rectangle_widths, reverse!(arrow), uniforms)
                end
            else
                append!(rectangle_widths, repeat([1], frames_in_residue_count))
            end

            frames_in_residue_count = 0
            prev_res_idx = res_idx
        end
        frames_in_residue_count += 1
        a += 1
    end

    return rectangle_widths, arrow_starts, arrow_frame_indices, n_to_c
end

# ----- per-frame geometry writers -----

"""
    generate_geometry_at_point!(result_mesh, idx, point, normal, binormal,
                                linked_residue_idx, rectangle_width,
                                fixed_color, residue_info_dict, config)

Write the cross-section ring (circle / ellipse / rectangle, depending
on `config.backbone_type` and per-residue secondary structure) plus
the per-vertex colors for one sample of the spline into `result_mesh`
at slot `idx`.
"""
function generate_geometry_at_point!(
        result_mesh::PlainMesh{T},
        result_mesh_index::Int,
        point::AbstractVector{T},
        normal::AbstractVector{T},
        binormal::AbstractVector{T},
        linked_residue_idx::Int,
        rectangle_width::T,
        fixed_color::Union{NTuple{3, Int}, Nothing},
        residue_info_dict::Dict{Int, Tuple{String, SecondaryStructureType}},
        config::BackboneConfig{T}) where T
    start_index = (result_mesh_index - 1) * config.resolution_cross + 1
    end_index   =  result_mesh_index      * config.resolution_cross

    vslice = @view result_mesh.vertices[:, start_index:end_index]
    nslice = @view result_mesh.normals[:,  start_index:end_index]

    if config.backbone_type == :backbone
        create_circle_in_local_frame!(vslice, nslice, point, normal, binormal,
                                      config.resolution_cross, config.tube_radius)
    elseif config.backbone_type == :ribbon
        create_ellipse_in_local_frame!(vslice, nslice, point, normal, binormal,
                                       config.resolution_cross,
                                       T(3) * config.tube_radius, config.tube_radius)
    elseif config.backbone_type == :cartoon
        structure = residue_info_dict[linked_residue_idx][2]
        if structure == SecondaryStructureElement.Helix
            create_ellipse_in_local_frame!(vslice, nslice, point, normal, binormal,
                                           config.resolution_cross,
                                           T(3)   * config.tube_radius,
                                           T(1.5) * config.tube_radius)
        elseif structure == SecondaryStructureElement.Strand
            create_rectangle_in_local_frame!(vslice, nslice, point, normal, binormal,
                                             config.resolution_cross,
                                             T(3)   * config.tube_radius * rectangle_width,
                                             T(0.5) * config.tube_radius)
        else
            create_circle_in_local_frame!(vslice, nslice, point, normal, binormal,
                                          config.resolution_cross, config.tube_radius)
        end
    end

    # Pick the per-residue color.
    color = nothing
    if fixed_color !== nothing
        color = fixed_color
    elseif config.color == :secondary_structure
        structure = residue_info_dict[linked_residue_idx][2]
        color = get(SS_COLORS, structure, (255, 255, 255))
    elseif config.color == :residue
        aa = residue_info_dict[linked_residue_idx][1]
        color = get(AA_COLORS, uppercase(aa), _AA_DEFAULT)
    end
    color === nothing && (color = (192, 192, 192))
    for i in start_index:end_index
        result_mesh.colors[i] = color
    end
end

# Overload for transition frames in cartoon mode: a single degenerate
# cross-section (all `resolution_cross` vertices coincident) used to
# splice a sudden color or shape change.
function generate_geometry_at_point!(
        result_mesh::PlainMesh{T},
        result_mesh_index::Int,
        point::AbstractVector{T},
        tangent::AbstractVector{T},
        linked_residue_idx::Int,
        fixed_color::Union{NTuple{3, Int}, Nothing},
        residue_info_dict::Dict{Int, Tuple{String, SecondaryStructureType}},
        config::BackboneConfig{T}) where T
    start_index = (result_mesh_index - 1) * config.resolution_cross + 1
    end_index   =  result_mesh_index      * config.resolution_cross

    result_mesh.vertices[:, start_index:end_index] =
        stack(repeat([point],   config.resolution_cross))
    result_mesh.normals[:,  start_index:end_index] =
        stack(repeat([tangent], config.resolution_cross))

    color = nothing
    if fixed_color !== nothing
        color = fixed_color
    elseif config.color == :secondary_structure
        structure = residue_info_dict[linked_residue_idx][2]
        color = get(SS_COLORS, structure, (255, 255, 255))
    elseif config.color == :residue
        aa = residue_info_dict[linked_residue_idx][1]
        color = get(AA_COLORS, uppercase(aa), _AA_DEFAULT)
    end
    color === nothing && (color = (192, 192, 192))
    for i in start_index:end_index
        result_mesh.colors[i] = color
    end
end

# ----- main per-chain pipeline -----

"""
    prepare_backbone_model(chain::Chain{T}; kwargs...) -> Representation{T}

Build a backbone / ribbon / cartoon representation of one chain. `kwargs`
override fields of `BackboneConfig`; see [`BackboneConfig`](@ref).

Returns a `Representation{T}` whose `mesh` is the swept-tube triangle
mesh, ready for the Bonito wire format.
"""
function prepare_backbone_model(chain::Chain{T};
                                fixed_color::Union{Nothing, NTuple{3, Int}}=nothing,
                                kwargs...) where T<:Real
    config = BackboneConfig{T}(; kwargs...)
    _check_config!(config)
    pm = _prepare_backbone_plain_mesh(chain, config, fixed_color)
    return Representation{T}(mesh = TriangleMesh(pm))
end

"""
    prepare_backbone_model(ac::System{T}; kwargs...) -> Representation{T}

Multichain wrapper: build a backbone mesh for every chain in `ac` and
merge into one `Representation`. Chains that fail to build (e.g. too
few CA atoms for a spline) are skipped with a warning, not propagated.
"""
function prepare_backbone_model(ac::System{T};
                                fixed_color::Union{Nothing, NTuple{3, Int}}=nothing,
                                kwargs...) where T<:Real
    config = BackboneConfig{T}(; kwargs...)
    _check_config!(config)

    chain_list = collect(chains(ac))

    chain_colors = (config.color == :chain) ? n_colors(length(chain_list)) : nothing

    meshes = PlainMesh{T}[]
    for (i, chain) in enumerate(chain_list)
        per_chain_fixed_color = fixed_color
        if config.color == :uniform && per_chain_fixed_color === nothing
            per_chain_fixed_color = (255, 0, 0)
        end
        if config.color == :chain
            per_chain_fixed_color = chain_colors[i]
        end
        try
            push!(meshes, _prepare_backbone_plain_mesh(chain, config, per_chain_fixed_color))
        catch e
            if e isa ErrorException && startswith(e.msg, "too few")
                @debug "Skipped chain $(chain.name): $(e.msg)"
            else
                @warn  "Skipped chain $(chain.name) due to unexpected error" exception=(e, catch_backtrace())
            end
        end
    end
    isempty(meshes) && return Representation{T}(mesh = nothing)
    merged = merge_meshes(meshes)
    return Representation{T}(mesh = TriangleMesh(merged))
end

# ----- core algorithm: chain -> PlainMesh -----

# The heavy-lifting function. Builds the spline, samples it, builds
# orthonormal frames, optionally inserts cartoon transition points,
# optionally filters by curvature, then sweeps a cross-section through
# every kept frame. Returns a `PlainMesh{T}` — the wrapper preparers
# convert to TriangleMesh and wrap in a Representation.
function _prepare_backbone_plain_mesh(chain::Chain{T}, config::BackboneConfig{T},
                                      fixed_color::Union{Nothing, NTuple{3, Int}}) where T<:Real
    fragment_list = collect(fragments(chain))

    # Cartoon needs secondary-structure info. If no SS is assigned for
    # the chain's amino acids, predict it on the parent system once.
    if config.backbone_type == :cartoon
        _ensure_secondary_structure!(chain)
    end

    # Spline construction.
    spline = if config.spline == :catmull_rom
        CatmullRom{T}(chain, config.control_point_strategy)
    elseif config.spline == :cubic_b
        CubicB{T}(chain, config.control_point_strategy)
    elseif config.spline == :linear
        Linear{T}(chain, config.control_point_strategy)
    end

    spline_points, sample_to_residue_indices = calculate_points(spline, config.resolution_along)
    velocities = calculate_velocities(spline, config.resolution_along)

    # Local frames.
    q::Matrix{T} = similar(velocities)
    r::Matrix{T} = similar(velocities)
    s::Matrix{T} = similar(velocities)
    if config.frame == :rmf
        q, r, s = rmf(spline_points, velocities)
    elseif config.frame == :second_spline
        second_spline_points = calculate_minor_points(spline, config.resolution_along)
        q, r, s = frames_from_two_splines(spline_points, velocities, second_spline_points)
    end

    # Cartoon transition points: 3 per SS change (begin-cap, end-cap,
    # cross-section seed) plus 1 per strand to start its arrowhead.
    ss_count = get_ss_count(sample_to_residue_indices, spline.residue_info_dict)
    num_transition_points = 0
    if config.backbone_type == :cartoon
        n_segments = ss_count[SecondaryStructureElement.Coil]   +
                     ss_count[SecondaryStructureElement.Helix]  +
                     ss_count[SecondaryStructureElement.Strand]
        num_transition_points += 3 * max(n_segments - 1, 0)
        num_transition_points += ss_count[SecondaryStructureElement.Strand]
    end

    transition_data = Vector{Union{Tuple{Vector{T}, Vector{T}, Int},
                                   Tuple{Vector{T}, Vector{T}, Vector{T}, Int, T}}}(
        undef, num_transition_points)
    transition_insertion_indices = Vector{Int}(undef, num_transition_points)
    fixed_indices::Vector{Int} = []

    arrow_insert_indices = collect(1:ss_count[SecondaryStructureElement.Strand])
    rectangle_widths = T[]    # only filled when backbone_type == :cartoon

    if config.backbone_type == :cartoon
        # Arrowhead widths for strand residues.
        rectangle_widths, arrow_starts, arrow_point_indices, n_to_c =
            compute_frame_widths(fragment_list, sample_to_residue_indices,
                                 spline.residue_info_dict)
        append!(fixed_indices, arrow_point_indices)

        # Insert transition points wherever the SS changes.
        prev_res_idx = sample_to_residue_indices[1]
        a = 1
        b = 1
        if spline.residue_info_dict[prev_res_idx][2] == SecondaryStructureElement.Strand
            arrow_insert_indices[a] = b
            a += 1
            b += 1
        end

        for i in eachindex(sample_to_residue_indices)
            res_idx = sample_to_residue_indices[i]
            prev_ss = spline.residue_info_dict[prev_res_idx][2]
            curr_ss = spline.residue_info_dict[res_idx][2]

            if res_idx != prev_res_idx && prev_ss != curr_ss
                if n_to_c
                    transition_data[b]     = (spline_points[:, i - 1], q[:, i - 1], prev_res_idx); b += 1
                    transition_data[b]     = (spline_points[:, i - 1], q[:, i - 1], res_idx);      b += 1
                    transition_data[b]     = (spline_points[:, i - 1], r[:, i - 1], s[:, i - 1], res_idx, T(1.0)); b += 1
                else
                    transition_data[b]     = (spline_points[:, i],     r[:, i],     s[:, i], prev_res_idx, T(1.0)); b += 1
                    transition_data[b]     = (spline_points[:, i],     q[:, i],     prev_res_idx); b += 1
                    transition_data[b]     = (spline_points[:, i],     q[:, i],     res_idx);      b += 1
                end
                transition_insertion_indices[b - 3:b - 1] .= i

                push!(fixed_indices, i - 1)
                push!(fixed_indices, i)

                if curr_ss == SecondaryStructureElement.Strand
                    arrow_insert_indices[a] = b
                    a += 1
                    b += 1
                end
            end
            prev_res_idx = res_idx
        end

        # Arrow-start transition (the very first frame of each arrow).
        a = 1
        for i in eachindex(arrow_starts)
            insertion_idx = arrow_starts[i]
            transition_data[arrow_insert_indices[a]] = (
                spline_points[:, insertion_idx], r[:, insertion_idx], s[:, insertion_idx],
                sample_to_residue_indices[insertion_idx], T(1.0))
            transition_insertion_indices[arrow_insert_indices[a]] =
                insertion_idx + (n_to_c ? 0 : 1)
            a += 1
        end
    end

    # Curvature filter (drop samples that don't add detail).
    if config.filter == :angle
        push!(fixed_indices, 1, size(spline_points, 2))   # always keep endpoints

        if config.color == :secondary_structure && config.backbone_type != :cartoon
            prev_res_idx = sample_to_residue_indices[1]
            prev_ss      = spline.residue_info_dict[prev_res_idx][2]
            for (i, res_idx) in enumerate(sample_to_residue_indices)
                if res_idx != prev_res_idx && spline.residue_info_dict[res_idx][2] != prev_ss
                    push!(fixed_indices, i - 1, i)
                    prev_ss      = spline.residue_info_dict[res_idx][2]
                    prev_res_idx = res_idx
                end
            end
        end
        if config.color == :residue
            prev_res_idx = sample_to_residue_indices[1]
            prev_was_nothing = false
            for (i, res_idx) in enumerate(sample_to_residue_indices)
                if res_idx === nothing
                    prev_was_nothing = true
                    continue
                end
                if res_idx != prev_res_idx && !prev_was_nothing
                    push!(fixed_indices, i - 1, i)
                    prev_res_idx = res_idx
                end
                prev_was_nothing = false
            end
        end

        remaining_indices, remaining_count =
            filter_points_threshold(q, r, fixed_indices; with_color=(config.color == :rainbow))
    else
        remaining_indices = collect(1:size(q, 2))
        remaining_count   = size(q, 2)
    end

    # Allocate output mesh: one cross-section ring per kept frame +
    # one for each cartoon transition point + 2 end-cap vertices.
    num_vertices = (remaining_count + num_transition_points) * config.resolution_cross + 2
    spline_mesh = PlainMesh{T}(
        Matrix{T}(undef, 3, num_vertices),
        Matrix{T}(undef, 3, num_vertices),
        Matrix{Int}(undef, 3, 0),
        Vector{NTuple{3, Int}}(undef, num_vertices),
    )

    # Interleave kept spline samples and transition points in
    # spline-order. `picker[1, j] == 0` means "ordinary sample at
    # picker[2, j]"; `== 1` means "transition_data[picker[2, j]]".
    picker = Matrix{Int}(undef, 2, remaining_count + num_transition_points)
    index_spline_points     = 1
    index_transition_points = 1
    i = 1
    j = 1
    while index_transition_points <= num_transition_points ||
          index_spline_points     <= length(remaining_indices)
        if index_transition_points <= num_transition_points &&
                transition_insertion_indices[index_transition_points] == i
            picker[1, j] = 1
            picker[2, j] = index_transition_points
            index_transition_points += 1
            j += 1
            continue
        end

        if config.filter == :none ||
                (config.filter == :angle && remaining_indices[index_spline_points] != -1)
            picker[1, j] = 0
            picker[2, j] = index_spline_points
            index_spline_points += 1
            i += 1
            j += 1
            continue
        end

        index_spline_points += 1
        i += 1
    end

    # Per-frame geometry pass.
    for jj in 1:remaining_count + num_transition_points
        color_in_thread = if config.color == :rainbow
            rainbow(jj / (remaining_count + num_transition_points))
        else
            fixed_color
        end

        if picker[1, jj] == 0
            rect_w = config.backbone_type == :cartoon ? T(rectangle_widths[picker[2, jj]]) : T(1.0)
            @views generate_geometry_at_point!(
                spline_mesh, jj,
                spline_points[:, picker[2, jj]],
                r[:, picker[2, jj]],
                s[:, picker[2, jj]],
                sample_to_residue_indices[picker[2, jj]],
                rect_w,
                color_in_thread,
                spline.residue_info_dict,
                config)
        else
            @views generate_geometry_at_point!(
                spline_mesh, jj,
                transition_data[picker[2, jj]]...,
                color_in_thread,
                spline.residue_info_dict,
                config)
        end
    end

    # End caps (use the first / last surviving sample's center +
    # outward tangent so the tube is closed).
    for i in axes(spline_points, 2)
        if config.filter == :none || remaining_indices[i] != -1
            spline_mesh.vertices[:, end - 1] = spline_points[:, i]
            spline_mesh.normals[:, end - 1]  = -q[:, i]
            spline_mesh.colors[end - 1]       = spline_mesh.colors[1]
            break
        end
    end
    for i in reverse(axes(spline_points, 2))
        if config.filter == :none || remaining_indices[i] != -1
            spline_mesh.vertices[:, end] = spline_points[:, i]
            spline_mesh.normals[:, end]  = q[:, i]
            spline_mesh.colors[end]       = spline_mesh.colors[end - 2]
            break
        end
    end

    # Triangle-stripping: stitch consecutive rings + close the caps.
    add_faces_to_tube_mesh!(spline_mesh, config.resolution_cross,
                            remaining_count + num_transition_points)
    return spline_mesh
end

# ----- Convenience preparers: ribbon, cartoon (system-level only) -----

"""
    prepare_ribbon_model(ac; kwargs...) -> Representation

Same pipeline as `prepare_backbone_model`, but with ribbon-specific
defaults (elliptical cross-section, dual-spline frame, per-chain
coloring). Any explicit kwarg overrides the default.
"""
function prepare_ribbon_model(ac::Union{Chain, System}; kwargs...)
    defaults = (
        backbone_type          = :ribbon,
        color                  = :chain,
        spline                 = :cubic_b,
        control_point_strategy = :mid_points,
        frame                  = :second_spline,
        filter                 = :angle,
    )
    prepare_backbone_model(ac; merge(defaults, kwargs)...)
end

"""
    prepare_cartoon_model(ac; kwargs...) -> Representation

Same pipeline as `prepare_backbone_model`, but with cartoon-specific
defaults (SS-aware cross-section, dual-spline frame, color by SS).
"""
function prepare_cartoon_model(ac::Union{Chain, System}; kwargs...)
    defaults = (
        backbone_type          = :cartoon,
        color                  = :secondary_structure,
        spline                 = :cubic_b,
        control_point_strategy = :mid_points,
        frame                  = :second_spline,
        filter                 = :angle,
    )
    prepare_backbone_model(ac; merge(defaults, kwargs)...)
end

# ----- cartoon SS fallback -----

# If a system / chain has no secondary-structure assignment, run
# BCA's built-in DSSP-style predictor once so cartoon mode has
# something to dispatch on. Emits a single info-level message so
# users know the assignment is automatic.
function _ensure_secondary_structure!(ac)
    sys = parent(ac)
    isnothing(sys) && return
    if isempty(secondary_structures(sys))
        @info "No secondary structure assigned — running predict_secondary_structure!"
        try
            predict_secondary_structure!(sys)
        catch e
            @warn "predict_secondary_structure! failed; cartoon will fall back to coil shape" exception=(e, catch_backtrace())
        end
    end
    return
end
