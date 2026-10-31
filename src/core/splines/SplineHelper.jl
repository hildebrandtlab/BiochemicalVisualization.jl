# Spline-pipeline glue: CA / O atom extraction, Carson & Bugg
# control-point construction, resolution-dependent sample counts, and
# the shared per-quadruple driver.
#
# Adapted from `src/splines/SplineHelper.jl` in Dorothee Brohl's fork.
# Two structural changes from the original:
#
#   1. `get_c_alpha_positions` no longer uses `atoms_df` / `fragments_df`
#      — those DataFrames-table views were dropped from the current
#      `BiochemicalAlgorithms.jl` API. We walk the chain's iterators
#      instead, which also removes the DataFrames dependency from BCV.
#
#   2. Per-residue secondary-structure tags no longer come from
#      `Fragment.properties[:SS]`. The current BCA exposes secondary
#      structure as a first-class `SecondaryStructure{T}` container,
#      with each element covering a contiguous range of fragment ids
#      (`first_fragment_idx:last_fragment_idx`). We build a
#      `Dict{fragment_idx → SecondaryStructureType}` once per chain and
#      consult it during the CA loop. Fragments not covered by any
#      element fall back to `SecondaryStructureElement.Coil`.

# Map fragment.idx → SecondaryStructureType for the chain (or system)
# `ac`. Fragments outside any SecondaryStructure element default to
# `Coil`, matching what the cartoon dispatcher expects for unresolved
# regions.
function _build_fragment_ss_map(ac)
    m = Dict{Int, SecondaryStructureType}()
    sys = parent(ac)
    isnothing(sys) && return m
    # `secondary_structures` returns a table over the whole system;
    # filter to the chain (if `ac` is a chain) by chain_idx.
    target_chain_idx = ac isa Chain ? ac.idx : nothing
    for ss in secondary_structures(sys)
        if !isnothing(target_chain_idx) && ss.chain_idx != target_chain_idx
            continue
        end
        @inbounds for fidx in ss.first_fragment_idx:ss.last_fragment_idx
            m[fidx] = ss.type
        end
    end
    return m
end

"""
    get_c_alpha_positions(chain[, with_oxygens=false])
        -> positions, fragment_indices, residue_info_dict[, oxygen_positions]

Walk `chain`, pull every CA (and optionally backbone O) atom of every
amino-acid residue, and return:

- `positions::Matrix{T}` — 3×N CA positions, ordered by fragment id.
- `fragment_indices::Vector{Int}` — the parent-fragment idx for each CA.
- `residue_info_dict::Dict{Int, Tuple{String, SecondaryStructureType}}`
  — name + secondary-structure type, keyed by fragment idx.

When `with_oxygens` is set, a fourth value, the backbone-O positions
ordered to match `positions`, is appended.
"""
function get_c_alpha_positions(chain::Chain{T}, with_oxygens::Bool=false) where T
    ss_map = _build_fragment_ss_map(chain)

    # Two-pass: first count the qualifying CA/O atoms so we can size
    # the output matrices exactly, then collect them. Matches the
    # original's behavior (pre-sized matrices) without DataFrames.
    n_ca = 0
    n_o  = 0
    for f in fragments(chain)
        is_amino_acid(f) || continue
        for a in atoms(f)
            if a.element == Elements.C && a.name == "CA"
                n_ca += 1
            elseif with_oxygens && a.element == Elements.O && a.name == "O"
                n_o  += 1
            end
        end
    end

    positions = Matrix{T}(undef, 3, n_ca)
    indices   = Vector{Int}(undef, n_ca)
    residue_info_dict = Dict{Int, Tuple{String, SecondaryStructureType}}()
    oxygen_positions = with_oxygens ? Matrix{T}(undef, 3, n_o) : nothing

    c_count = 1
    o_count = 1
    for f in fragments(chain)
        is_amino_acid(f) || continue
        ss = get(ss_map, f.idx, SecondaryStructureElement.Coil)
        for a in atoms(f)
            if a.element == Elements.C && a.name == "CA"
                positions[:, c_count] = a.r
                indices[c_count] = f.idx
                residue_info_dict[f.idx] = (String(f.name), ss)
                c_count += 1
            elseif with_oxygens && a.element == Elements.O && a.name == "O"
                oxygen_positions[:, o_count] = a.r
                o_count += 1
            end
        end
    end

    # Fragments are iterated in id order, but be defensive — sort if
    # the iteration ever yields out-of-order ids.
    if !issorted(indices)
        order = sortperm(indices)
        indices = indices[order]
        positions = positions[:, order]
        if with_oxygens
            oxygen_positions = oxygen_positions[:, order]
        end
    end

    return with_oxygens ? (positions, indices, residue_info_dict, oxygen_positions) :
                          (positions, indices, residue_info_dict)
end

"""
    generate_points_carson_bugg(chain, offset_helix_points::Bool)
        -> main_points, minor_points, fragment_indices, residue_info_dict

Carson & Bugg's mid-point construction: for every consecutive pair of
CA atoms, build a pair of control points lying in the peptide plane.
`main_points` lie at the midpoint of each CA-CA segment; `minor_points`
sit on the binormal direction. When `offset_helix_points=true` the
main points of helix residues are nudged along the in-plane normal to
keep the spline outside the alpha-helix turns (matches BALLView).
"""
function generate_points_carson_bugg(chain::Chain{T}, offset_helix_points::Bool) where T
    c_positions, point_to_residue_indices, residue_info_dict, o_positions =
        get_c_alpha_positions(chain, true)

    structures = Vector{SecondaryStructureType}(undef, length(point_to_residue_indices))
    for (i, res_idx) in enumerate(point_to_residue_indices)
        structures[i] = residue_info_dict[res_idx][2]
    end
    if size(c_positions, 2) < 3
        throw(ErrorException(
            "too few ($(size(c_positions, 2))) c_alpha atoms to compute spline " *
            "with Carson & Bugg method"))
    end

    main_points  = Matrix{T}(undef, 3, size(c_positions, 2) - 1)
    minor_points = Matrix{T}(undef, 3, size(c_positions, 2) - 1)

    # Construct peptide planes to obtain spline control points.
    current_flip = false
    prev_D::Union{Vector{T}, Nothing} = nothing
    for i in 1:size(c_positions, 2) - 1
        A = c_positions[:, i + 1] .- c_positions[:, i]
        B = o_positions[:, i]     .- c_positions[:, i]
        C = cross(A, B)
        D = cross(C, A)

        normalize!(C)
        normalize!(D)

        flip = prev_D !== nothing && abs(acos(dot(prev_D, D))) > 0.5 * π
        if flip
            current_flip = !current_flip
        end
        prev_D = D

        P = c_positions[:, i] + T(0.5) * A
        if offset_helix_points && (
                structures[i]     == SecondaryStructureElement.Helix ||
                structures[i + 1] == SecondaryStructureElement.Helix)
            P += T(1.5) * C
        end

        main_points[:, i] = P
        minor_points[:, i] = current_flip ? P + D : P - D
    end

    return main_points, minor_points, point_to_residue_indices, residue_info_dict
end

# Resolution-dependent sample-count table for Catmull-Rom / cubic B
# splines. Same algorithm as in the fork.
function calculate_resolution_dependent_data(spline::Union{CatmullRom, CubicB}, resolution)
    num_points_v = Vector{Int}(undef, size(spline.controlPoints, 2) - 3)
    sample_mapping::Vector{Int} = []

    sizehint!(sample_mapping,
              Int(round((size(spline.controlPoints, 2) - 3) * 3.75 * resolution)))
    i = 1
    while i + 3 <= size(spline.controlPoints, 2)
        distance = @views norm(spline.controlPoints[:, i + 1] .- spline.controlPoints[:, i + 2])
        num_points_v[i] = max(2, convert(Int, ceil(resolution * distance)))

        if spline.controlPointStrategy == :c_alpha
            first_half_num  = num_points_v[i] ÷ 2
            second_half_num = num_points_v[i] - first_half_num
            if i + 3 != size(spline.controlPoints, 2)
                second_half_num -= 1
            end
            push!(sample_mapping,
                  repeat([spline.point_to_residue_indices[i + 1]], first_half_num)...,
                  repeat([spline.point_to_residue_indices[i + 2]], second_half_num)...)
        elseif spline.controlPointStrategy == :mid_points
            repeats = num_points_v[i]
            if i + 3 != size(spline.controlPoints, 2)
                repeats -= 1
            end
            push!(sample_mapping,
                  repeat([spline.point_to_residue_indices[i + 2]], repeats)...)
        end
        i += 1
    end

    dict_key = Int(round(resolution * 1000))
    spline.num_points_per_resolution[dict_key]     = num_points_v
    spline.sample_mapping_per_resolution[dict_key] = sample_mapping
end

function num_points(spline, resolution)
    dict_key = Int(round(resolution * 1000))
    if dict_key ∉ keys(spline.num_points_per_resolution)
        calculate_resolution_dependent_data(spline, resolution)
    end
    return spline.num_points_per_resolution[dict_key]
end

function sample_to_fragment_index_mapping(spline, resolution)
    dict_key = Int(round(resolution * 1000))
    if dict_key ∉ keys(spline.sample_mapping_per_resolution)
        calculate_resolution_dependent_data(spline, resolution)
    end
    return spline.sample_mapping_per_resolution[dict_key]
end

"""
    evaluate_generic_quadruple_spline(control_points, num_points, fn)
        -> Matrix{T}

Sample a quadruple-based spline (Catmull-Rom or cubic B) by iterating
over every consecutive 4-tuple of control points, calling `fn` to
produce that segment's samples, and stitching the results end-to-end
(the last sample of each segment is the first sample of the next).
"""
function evaluate_generic_quadruple_spline(
        control_points::Matrix{T}, num_points, fn) where T
    result_points = Matrix{T}(undef, 3, sum(num_points) - length(num_points) + 1)
    cumulative_indices = cumsum([1, num_points...])
    for i in 1:size(control_points, 2) - 3
        result_points[:, cumulative_indices[i] - (i - 1):cumulative_indices[i + 1] - (i - 1) - 1] =
            @views fn((control_points[:, i],     control_points[:, i + 1],
                       control_points[:, i + 2], control_points[:, i + 3]),
                      num_points[i])
    end
    return result_points
end
