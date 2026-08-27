function prepare_van_der_waals_model(
        ac::AbstractAtomContainer{T};
        sphere_radius::Union{Nothing, Real}=nothing) where {T<:Real}

    radius_for = isnothing(sphere_radius) ?
        a -> T(element_vdw_radius(a.element)) :
        a -> T(sphere_radius)

    spheres = map(a -> _sphere(a.r, radius_for(a)), atoms(ac))
    sphere_colors         = [element_color(e)         for e in atoms(ac).element]
    sphere_colors_qutemol = [element_color_qutemol(e) for e in atoms(ac).element]
    meta_data = [_atom_metadata(at) for at in atoms(ac)]

    Representation{T}(
        primitives=Dict("spheres" => spheres),
        meta_data=meta_data,
        colors=Dict(
            "sphere_colors"         => sphere_colors,
            "sphere_colors_qutemol" => sphere_colors_qutemol,
        )
    )
end
