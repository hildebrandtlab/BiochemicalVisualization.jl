# Curvature-driven spline-sample decimation. Drops consecutive samples
# whose tangent (q) and normal (r) directions stay nearly parallel to
# the last-kept sample, so long flat stretches of the spline use fewer
# vertices while curved regions keep their density. Originally written
# by Dorothee Brohl in `src/helpers/point_filter.jl` of her fork.

"""
    filter_points_threshold(q, r, fixed_indices; with_color=false)
        -> (target_indices::Vector{Int}, n_kept::Int)

Decide which samples of a tangent / normal pair sequence to keep.
Both `q` and `r` are 3×N matrices of unit vectors (tangent and a
companion frame axis); `fixed_indices` lists sample positions that must
NOT be filtered out (e.g. the first and last sample of each
control-point span).

Returns:
- `target_indices`: vector of length `N`; for each input sample either
  its new (1-based) position in the kept set, or `-1` if the sample
  was dropped.
- `n_kept`: total number of surviving samples.

A sample is kept iff the angle between its tangent and the last-kept
tangent exceeds ~5°, or the same applies to the companion axis, or
`with_color=true` and the rainbow distance to the last-kept sample
exceeds 1/8 of the full rainbow.
"""
function filter_points_threshold(q::Matrix{T}, r::Matrix{T},
                                 fixed_indices::AbstractVector{Int};
                                 with_color::Bool=false) where T
    target_indices = fill(-1, size(q, 2))
    sort!(fixed_indices)

    degree_threshold = 5
    radian_threshold = degree_threshold / 360 * 2 * π
    # Max fraction of the rainbow that may be interpolated linearly
    # before we force an additional frame to keep the color jump small.
    color_threshold  = 0.125

    dot_prod_q = T(0)
    dot_prod_r = T(0)
    large_color_distance = false

    last_remaining_index = 1
    a = 1
    for i in axes(q, 2)
        if i == 1 || insorted(i, fixed_indices)
            last_remaining_index = i
            target_indices[i] = a
            a += 1
        else
            dot_prod_q = @views dot(q[:, last_remaining_index], q[:, i])
            dot_prod_r = @views dot(r[:, last_remaining_index], r[:, i])

            large_color_distance =
                with_color && (i - last_remaining_index) / size(q, 2) > color_threshold

            if (abs(dot_prod_q) > 1 || abs(acos(dot_prod_q)) > radian_threshold
                || abs(dot_prod_r) > 1 || abs(acos(dot_prod_r)) > radian_threshold
                || large_color_distance)
                last_remaining_index = i
                target_indices[i] = a
                a += 1
            end
        end
    end
    return target_indices, a - 1
end
