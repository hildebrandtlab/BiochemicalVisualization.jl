# Uniform cubic B-spline. Direct port of `src/splines/CubicB.jl` from
# Dorothee Brohl's fork. The `controlPointStrategy` enum value was
# replaced with a Symbol — see Linear.jl for the rationale.

mutable struct CubicB{T<:Real}
    controlPointStrategy::Symbol
    controlPoints::Matrix{T}                              # 3×N
    minorControlPoints::Union{Matrix{T}, Nothing}

    point_to_residue_indices::Vector{Int}
    residue_info_dict::Dict{Int, Tuple{String, SecondaryStructureType}}

    num_points_per_resolution::Dict{Int, Vector}
    sample_mapping_per_resolution::Dict{Int, Vector}

    function CubicB{T}(chain::Chain{T}, control_point_strategy::Symbol) where T
        if control_point_strategy == :c_alpha
            points, point_to_residue_indices, residue_info_dict =
                get_c_alpha_positions(chain)
            if length(points) < 2
                throw(ErrorException(
                    "too few ($(length(points))) c_alpha atoms to compute spline"))
            end

            first_point = points[:, 1]   - (points[:, 2]   - points[:, 1])
            last_point  = points[:, end] + (points[:, end] - points[:, end - 1])
            points = hcat(first_point, points, last_point)

            prepend!(point_to_residue_indices, point_to_residue_indices[1])
            push!(point_to_residue_indices,    point_to_residue_indices[end])

            new{T}(control_point_strategy, points, nothing,
                   point_to_residue_indices, residue_info_dict, Dict(), Dict())
        elseif control_point_strategy == :mid_points
            major_points, minor_points, point_to_residue_indices, residue_info_dict =
                generate_points_carson_bugg(chain, true)

            major_points = [major_points[:, 1]   major_points   major_points[:, end]]
            minor_points = [minor_points[:, 1]   minor_points   minor_points[:, end]]

            prepend!(point_to_residue_indices, point_to_residue_indices[1])
            push!(point_to_residue_indices,    point_to_residue_indices[end])

            new{T}(control_point_strategy, major_points, minor_points,
                   point_to_residue_indices, residue_info_dict, Dict(), Dict())
        else
            throw(ArgumentError("$control_point_strategy not implemented for cubic B-spline"))
        end
    end
end

function calculate_points(spline::CubicB, resolution)
    return evaluate_generic_quadruple_spline(spline.controlPoints,
            num_points(spline, resolution), compute_cubicb_quadruple),
           sample_to_fragment_index_mapping(spline, resolution)
end

function calculate_velocities(spline::CubicB, resolution)
    return evaluate_generic_quadruple_spline(spline.controlPoints,
            num_points(spline, resolution), compute_cubicb_quadruple_derivative)
end

function calculate_minor_points(spline::CubicB, resolution)
    return evaluate_generic_quadruple_spline(spline.minorControlPoints,
            num_points(spline, resolution), compute_cubicb_quadruple)
end

function compute_cubicb_quadruple(
        (P0, P1, P2, P3)::NTuple{4, AbstractVector{T}}, num_points::Int) where T
    result_points = Matrix{T}(undef, 3, num_points)

    M = [ 1  4  1  0
         -3  0  3  0
          3 -6  3  0
         -1  3 -3  1]
    p_matrix = [P0 P1 P2 P3]'
    fixed_part::Matrix{T} = (T(1 / 6) * M * p_matrix)'

    sampling_range = range(T(0), T(1), num_points)

    t_matrix::Vector{T} = [T(1), 0, 0, 0]
    for (i, t) in enumerate(sampling_range)
        t_matrix[2:4] = [t, t^2, t^3]
        mul!(@view(result_points[:, i:i]), fixed_part, t_matrix)
    end
    return result_points
end

function compute_cubicb_quadruple_derivative(
        (P0, P1, P2, P3)::NTuple{4, AbstractVector{T}}, num_points::Int) where T
    result_points = Matrix{T}(undef, 3, num_points)

    M = [ 1  4  1  0
         -3  0  3  0
          3 -6  3  0
         -1  3 -3  1]
    p_matrix = [P0 P1 P2 P3]'
    fixed_part::Matrix{T} = (T(1 / 6) * M * p_matrix)'

    sampling_range = range(T(0), T(1), num_points)
    t_matrix::Vector{T} = [T(0), 1, 0, 0]
    for (i, t) in enumerate(sampling_range)
        t_matrix[3:4] = [2 * t, 3 * t^2]
        mul!(@view(result_points[:, i:i]), fixed_part, t_matrix)
    end
    return result_points
end
