# Piecewise-linear interpolation through a sequence of control points,
# used as a "no-spline" baseline for backbone rendering and as a
# debugging aid. Direct port of `src/splines/Linear.jl` from Dorothee
# Brohl's fork. The only adaptation is the `controlPointStrategy`
# field: the fork carries an `EnumX` enum value; we use a `Symbol`
# (`:c_alpha` or `:mid_points`) since that's the only state the backbone
# pipeline reads off it, and it avoids pulling EnumX into BCV.

mutable struct Linear{T<:Real}
    controlPointStrategy::Symbol
    controlPoints::Matrix{T}                              # 3×N
    minorControlPoints::Union{Matrix{T}, Nothing}

    point_to_residue_indices::Vector{Int}
    residue_info_dict::Dict{Int, Tuple{String, SecondaryStructureType}}

    num_points_per_resolution::Dict{Int, Vector}
    sample_mapping_per_resolution::Dict{Int, Vector}

    function Linear{T}(chain::Chain{T}, control_point_strategy::Symbol) where T
        if control_point_strategy == :c_alpha
            points, point_to_residue_indices, residue_info_dict =
                get_c_alpha_positions(chain)
            if length(points) < 2
                throw(ErrorException(
                    "too few ($(length(points))) c_alpha atoms to compute spline"))
            end
            new{T}(control_point_strategy, points, nothing,
                   point_to_residue_indices, residue_info_dict, Dict(), Dict())
        elseif control_point_strategy == :mid_points
            major_points, minor_points, point_to_residue_indices, residue_info_dict =
                generate_points_carson_bugg(chain, false)
            new{T}(control_point_strategy, major_points, minor_points,
                   point_to_residue_indices, residue_info_dict, Dict(), Dict())
        else
            throw(ArgumentError("$control_point_strategy not implemented for Linear spline"))
        end
    end
end

function calculate_points(spline::Linear{T}, resolution) where T
    nums = num_points(spline, resolution)
    result_points = Matrix{T}(undef, 3, sum(nums) - length(nums) + 1)
    a = 1
    for i in 1:size(spline.controlPoints, 2) - 1
        for j in range(0, 1, nums[i])
            @. result_points[:, a] =
                (1 - j) * spline.controlPoints[:, i] + j * spline.controlPoints[:, i + 1]
            a += 1
        end
        a -= 1
    end
    return result_points, sample_to_fragment_index_mapping(spline, resolution)
end

function calculate_velocities(spline::Linear{T}, resolution) where T
    nums = num_points(spline, resolution)
    result_points = Matrix{T}(undef, 3, sum(nums) - length(nums) + 1)
    a = 1
    for i in 1:size(spline.controlPoints, 2) - 1
        result_points[:, a:a + nums[i] - 1] .=
            -spline.controlPoints[:, i] + spline.controlPoints[:, i + 1]
        a += nums[i] - 1
    end
    return result_points
end

function calculate_minor_points(spline::Linear{T}, resolution) where T
    nums = num_points(spline, resolution)
    result_points = Matrix{T}(undef, 3, sum(nums) - length(nums) + 1)
    a = 1
    for i in 1:size(spline.minorControlPoints, 2) - 1
        for j in range(0, 1, nums[i])
            @. result_points[:, a] =
                (1 - j) * spline.minorControlPoints[:, i] +
                j       * spline.minorControlPoints[:, i + 1]
            a += 1
        end
        a -= 1
    end
    return result_points
end

function calculate_resolution_dependent_data(spline::Linear, resolution)
    num_points_v::Vector{Int} = []
    sample_mapping::Vector{Int} = []
    i = 1
    while i + 1 <= size(spline.controlPoints, 2)
        distance = @views norm(spline.controlPoints[:, i] .- spline.controlPoints[:, i + 1])
        push!(num_points_v, max(2, convert(Int, ceil(resolution * distance))))

        if spline.controlPointStrategy == :c_alpha
            first_half_num  = num_points_v[end] ÷ 2
            second_half_num = num_points_v[end] - first_half_num
            if i + 1 != size(spline.controlPoints, 2)
                second_half_num -= 1
            end
            push!(sample_mapping,
                  repeat([spline.point_to_residue_indices[i]],     first_half_num)...,
                  repeat([spline.point_to_residue_indices[i + 1]], second_half_num)...)
        elseif spline.controlPointStrategy == :mid_points
            repeats = num_points_v[end]
            if i + 1 != size(spline.controlPoints, 2)
                repeats -= 1
            end
            push!(sample_mapping,
                  repeat([spline.point_to_residue_indices[i + 1]], repeats)...)
        end
        i += 1
    end

    dict_key = Int(round(resolution * 1000))
    spline.num_points_per_resolution[dict_key]     = num_points_v
    spline.sample_mapping_per_resolution[dict_key] = sample_mapping
end
