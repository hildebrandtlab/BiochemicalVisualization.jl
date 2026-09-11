using StaticArrays

const Float4 = SVector{4, Float32}

# WIP: not yet implemented; do not export until it returns a usable surface.
function compute_sliced_ses(
        ac::AbstractAtomContainer{T};
        probe_radius=1.4) where {T<:Real}

    bounding_box = compute_bounding_box(ac)
    max_radius = maximum(map(a -> a.radius, atoms(ac)))

    @debug "compute_sliced_ses bounds=$bounding_box max_radius=$max_radius probe_radius=$probe_radius"
    nothing
end
