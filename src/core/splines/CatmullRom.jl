# Centripetal Catmull-Rom spline. Direct port of `src/splines/CatmullRom.jl`
# from Dorothee Brohl's fork. The maths is unchanged; only the
# `controlPointStrategy` enum was replaced by a Symbol (see Linear.jl
# for the rationale).

mutable struct CatmullRom{T<:Real}
    controlPointStrategy::Symbol
    controlPoints::Matrix{T}                              # 3×N
    minorControlPoints::Union{Matrix{T}, Nothing}

    point_to_residue_indices::Vector{Int}
    residue_info_dict::Dict{Int, Tuple{String, SecondaryStructureType}}

    num_points_per_resolution::Dict{Int, Vector}
    sample_mapping_per_resolution::Dict{Int, Vector}

    function CatmullRom{T}(chain::Chain{T}, control_point_strategy::Symbol) where T
        if control_point_strategy == :c_alpha
            points, point_to_residue_indices, residue_info_dict =
                get_c_alpha_positions(chain)
            if length(points) < 2
                throw(ErrorException(
                    "too few ($(length(points))) c_alpha atoms to compute spline"))
            end

            # Add a leading and trailing dummy point so the cubic span
            # covers the original first/last samples. The dummies are
            # mirror-extensions of the first / last interval so the
            # sampling produces no NaNs (control points must differ).
            first_point = points[:, 1]   - (points[:, 2]     - points[:, 1])
            last_point  = points[:, end] + (points[:, end]   - points[:, end - 1])
            points = hcat(first_point, points, last_point)

            prepend!(point_to_residue_indices, point_to_residue_indices[1])
            push!(point_to_residue_indices,    point_to_residue_indices[end])

            new{T}(control_point_strategy, points, nothing,
                   point_to_residue_indices, residue_info_dict, Dict(), Dict())
        elseif control_point_strategy == :mid_points
            major_points, minor_points, point_to_residue_indices, residue_info_dict =
                generate_points_carson_bugg(chain, false)

            major_points = [major_points[:, 1] - (major_points[:, 2]   - major_points[:, 1])  major_points  major_points[:, end] + (major_points[:, end] - major_points[:, end - 1])]
            minor_points = [minor_points[:, 1] - (minor_points[:, 2]   - minor_points[:, 1])  minor_points  minor_points[:, end] + (minor_points[:, end] - minor_points[:, end - 1])]

            prepend!(point_to_residue_indices, point_to_residue_indices[1])
            push!(point_to_residue_indices,    point_to_residue_indices[end])

            new{T}(control_point_strategy, major_points, minor_points,
                   point_to_residue_indices, residue_info_dict, Dict(), Dict())
        else
            throw(ArgumentError("$control_point_strategy not implemented for Catmull-Rom spline"))
        end
    end
end

function calculate_points(spline::CatmullRom, resolution)
    return evaluate_generic_quadruple_spline(spline.controlPoints,
            num_points(spline, resolution), compute_catmull_rom_quadruple),
           sample_to_fragment_index_mapping(spline, resolution)
end

function calculate_velocities(spline::CatmullRom, resolution)
    return evaluate_generic_quadruple_spline(spline.controlPoints,
            num_points(spline, resolution), compute_catmull_rom_quadruple_derivative)
end

function calculate_minor_points(spline::CatmullRom, resolution)
    return evaluate_generic_quadruple_spline(spline.minorControlPoints,
            num_points(spline, resolution), compute_catmull_rom_quadruple)
end

# Centripetal Catmull-Rom interpolation. Code adapted from
# https://en.wikipedia.org/wiki/Centripetal_Catmull%E2%80%93Rom_spline#Code_example_in_Python
function compute_catmull_rom_quadruple(
        (P0, P1, P2, P3)::NTuple{4, AbstractVector{T}}, num_points::Int) where T
    t0 = T(0)
    t1 = tRecursion(P1, P0, t0)
    t2 = tRecursion(P2, P1, t1)
    t3 = tRecursion(P3, P2, t2)

    result_points = Matrix{T}(undef, 3, num_points)
    ts = collect(range(t1, t2, num_points))

    A1 = Vector{T}(undef, 3); A2 = Vector{T}(undef, 3); A3 = Vector{T}(undef, 3)
    B1 = Vector{T}(undef, 3); B2 = Vector{T}(undef, 3)

    for (i, t) in enumerate(ts)
        @. A1 = (t1 - t) / (t1 - t0) * P0 + (t - t0) / (t1 - t0) * P1
        @. A2 = (t2 - t) / (t2 - t1) * P1 + (t - t1) / (t2 - t1) * P2
        @. A3 = (t3 - t) / (t3 - t2) * P2 + (t - t2) / (t3 - t2) * P3

        @. B1 = (t2 - t) / (t2 - t0) * A1 + (t - t0) / (t2 - t0) * A2
        @. B2 = (t3 - t) / (t3 - t1) * A2 + (t - t1) / (t3 - t1) * A3

        @. result_points[:, i] = (t2 - t) / (t2 - t1) * B1 + (t - t1) / (t2 - t1) * B2
    end
    return result_points
end

function compute_catmull_rom_quadruple_derivative(
        (P0, P1, P2, P3)::NTuple{4, AbstractVector{T}}, num_points::Int) where T
    t0 = T(0)
    t1 = tRecursion(P1, P0, t0)
    t2 = tRecursion(P2, P1, t1)
    t3 = tRecursion(P3, P2, t2)

    result_velocities = Matrix{T}(undef, 3, num_points)
    ts = collect(range(t1, t2, num_points))

    A1  = Vector{T}(undef, 3); A2  = Vector{T}(undef, 3); A3  = Vector{T}(undef, 3)
    B1  = Vector{T}(undef, 3); B2  = Vector{T}(undef, 3)
    A1v = Vector{T}(undef, 3); A2v = Vector{T}(undef, 3); A3v = Vector{T}(undef, 3)
    B1v = Vector{T}(undef, 3); B2v = Vector{T}(undef, 3)

    for (i, t) in enumerate(ts)
        @. A1 = (t1 - t) / (t1 - t0) * P0 + (t - t0) / (t1 - t0) * P1
        @. A2 = (t2 - t) / (t2 - t1) * P1 + (t - t1) / (t2 - t1) * P2
        @. A3 = (t3 - t) / (t3 - t2) * P2 + (t - t2) / (t3 - t2) * P3

        @. B1 = (t2 - t) / (t2 - t0) * A1 + (t - t0) / (t2 - t0) * A2
        @. B2 = (t3 - t) / (t3 - t1) * A2 + (t - t1) / (t3 - t1) * A3

        # first derivative
        @. A1v = -1 / (t1 - t0) * P0 + 1 / (t1 - t0) * P1
        @. A2v = -1 / (t2 - t1) * P1 + 1 / (t2 - t1) * P2
        @. A3v = -1 / (t3 - t2) * P2 + 1 / (t3 - t2) * P3

        @. B1v = -1 / (t2 - t0) * A1 + (t2 - t) / (t2 - t0) * A1v +
                  1 / (t2 - t0) * A2 + (t  - t0) / (t2 - t0) * A2v
        @. B2v = -1 / (t3 - t1) * A2 + (t3 - t) / (t3 - t1) * A2v +
                  1 / (t3 - t1) * A3 + (t  - t1) / (t3 - t1) * A3v
        @. result_velocities[:, i] =
                 -1 / (t2 - t1) * B1 + (t2 - t) / (t2 - t1) * B1v +
                  1 / (t2 - t1) * B2 + (t  - t1) / (t2 - t1) * B2v
    end
    return result_velocities
end

# Centripetal knot recursion (exponent 0.5).
tRecursion(pCurr::AbstractVector{T}, pPrev::AbstractVector{T}, tPrev::T) where T =
    norm(pCurr .- pPrev) ^ T(0.5) + tPrev
