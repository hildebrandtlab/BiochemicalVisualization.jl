function prepare_van_der_waals_model(
    ac::AbstractAtomContainer{T}) where {T<:Real}

    # todo: get vdw radii
    spheres = map(a -> _sphere(a.r, max(a.radius, T(1.0))), atoms(ac))
    sphere_colors = [element_color(e) for e in atoms(ac).element]

    Representation{T}(spheres, sphere_colors)
end
