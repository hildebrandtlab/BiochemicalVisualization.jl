# Orthonormal-frame construction along a sampled spline. Two
# variants are needed by the backbone pipeline:
#
#   - rotation-minimizing frames (Wang/Jüttler/Zheng/Liu 2008) for the
#     circular / elliptical cross-sections of backbone and helix
#     segments, where there is no second curve to anchor the frame's
#     up direction against;
#   - dual-spline frames (Carson & Bugg 1986) for ribbon-shaped
#     sections, where a second spline through the peptide-plane
#     binormal supplies an explicit up direction per sample.
#
# Direct port of `src/models/backbone/frame_construction.jl` from
# Dorothee Brohl's fork. The only change is replacing the fork's
# custom `log_warning` logger with Julia's built-in `@warn`, since
# BCV doesn't ship a logger module.

"""
    rmf(points::Matrix{T}, tangents::Matrix{T})
        -> (tangents, normals, binormals)

Construct orthonormal frames along a curve while minimizing the
rotation of the frame around the tangent axis between consecutive
samples (so a tube swept along the curve doesn't twist artificially).

Implementation follows Wang, Jüttler, Zheng & Liu, "Computation of
rotation minimizing frames" (ACM TOG 2008, doi:10.1145/1330511.1330513).

All three returned matrices are 3×N with unit-length columns.
"""
function rmf(points::Matrix{T}, tangents::Matrix{T}) where T
    ts = copy(tangents)
    rs = Matrix{T}(undef, 3, size(points, 2))
    ss = Matrix{T}(undef, 3, size(points, 2))

    for i in axes(ts, 2)
        if approx_zero(norm(ts[:, i]))
            @warn "rmf: zero-length tangent" index=i n=size(ts, 2) tangent=ts[:, i]
        end
        normalize_col!(ts, i)
    end

    # Seed the first frame's `r` axis with an arbitrary direction that
    # isn't parallel to the first tangent.
    temp = (approx_zero(ts[2, 1]) && approx_zero(ts[3, 1])) ? [0; 1; 0] : [1; 0; 0]
    @views cross!(rs[:, 1], ts[:, 1], temp)
    normalize_col!(rs, 1)

    @views cross!(ss[:, 1], ts[:, 1], rs[:, 1])

    v1   = Vector{T}(undef, 3)
    v2   = Vector{T}(undef, 3)
    r_iL = Vector{T}(undef, 3)
    t_iL = Vector{T}(undef, 3)
    @views for i in 1:size(points, 2) - 1
        # Double-reflection step: reflect r and t about the bisecting
        # plane of (p_i, p_{i+1}), then about (t_iL, t_{i+1}); the
        # result is the rotation-minimizing transport.
        v1 .= points[:, i + 1] .- points[:, i]
        c1  = dot(v1, v1)
        r_iL .= rs[:, i] .- ((2 / c1) * dot(v1, rs[:, i])) .* v1
        t_iL .= ts[:, i] .- ((2 / c1) * dot(v1, ts[:, i])) .* v1
        v2 .= ts[:, i + 1] .- t_iL
        c2  = dot(v2, v2)
        rs[:, i + 1] .= r_iL .- ((2 / c2) * dot(v2, r_iL)) .* v2
        if approx_zero(norm(rs[:, i + 1]))
            @warn "rmf: zero-length r vector" index=(i + 1) r=rs[:, i + 1]
        end
        normalize_col!(rs, i + 1)
        @views cross!(ss[:, i + 1], ts[:, i + 1], rs[:, i + 1])
    end
    return ts, rs, ss
end

"""
    frames_from_two_splines(major_points, major_tangents, minor_points)
        -> (tangents, normals, binormals)

Construct orthonormal frames where the normal direction at each sample
is fixed by an auxiliary "minor" spline (typically the Carson & Bugg
companion through the peptide-plane offsets), not derived implicitly
like in `rmf`. Used for ribbon and helix sections, where the desired
ribbon plane is meaningful and must be respected.

Carson & Bugg, "Algorithm for ribbon models of proteins" (JMG 1986,
doi:10.1016/0263-7855(86)80010-8).
"""
function frames_from_two_splines(major_spline_points::Matrix{T},
                                 major_spline_tangents::Matrix{T},
                                 minor_spline_points::Matrix{T}) where T
    ts = similar(major_spline_tangents)
    rs = similar(major_spline_tangents)
    ss = similar(major_spline_tangents)

    @views for i in axes(major_spline_tangents, 2)
        ts[:, i] = normalize(major_spline_tangents[:, i])

        # r is the in-plane vector from this main spline sample to the
        # corresponding minor-spline sample, projected onto the plane
        # perpendicular to the tangent.
        rs[:, i] = minor_spline_points[:, i] .- major_spline_points[:, i]
        normalize_col!(rs, i)
        rs[:, i] .-= (dot(rs[:, i], ts[:, i]) .* ts[:, i])
        normalize_col!(rs, i)

        # Third axis closes the right-handed orthonormal frame.
        @views cross!(ss[:, i], ts[:, i], rs[:, i])
    end
    return ts, rs, ss
end
