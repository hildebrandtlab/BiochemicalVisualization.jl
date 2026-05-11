function prepare_ball_and_stick_model(
        ac::AbstractAtomContainer{T};
        sphere_radius=T(0.4),
        stick_radius=T(0.2)) where {T<:Real}

    spheres = map(a -> _sphere(a.r, sphere_radius), atoms(ac))
    sphere_colors         = [element_color(e)         for e in atoms(ac).element]
    sphere_colors_qutemol = [element_color_qutemol(e) for e in atoms(ac).element]
    meta_data = [_atom_metadata(at) for at in atoms(ac)]

    # Resolve through `parent(ac)` so bond endpoints survive when `ac` is
    # a subset (chain/fragment) rather than the whole System.
    sticks = [(atom_by_idx(parent(ac), b.a1), atom_by_idx(parent(ac), b.a2)) for b in bonds(ac)]
    midpoints = map(s -> (s[1].r + s[2].r) / T(2), sticks)

    cylinders = collect(Iterators.flatten(map(((s, m),) -> (
        _cylinder(s[1].r, m, stick_radius),
        _cylinder(m, s[2].r, stick_radius)), zip(sticks, midpoints))))
    cylinder_colors = collect(Iterators.flatten(
        map(s -> (element_color(s[1].element), element_color(s[2].element)), sticks)))
    cylinder_colors_qutemol = collect(Iterators.flatten(
        map(s -> (element_color_qutemol(s[1].element), element_color_qutemol(s[2].element)), sticks)))
    # Flag each cylinder that belongs to a bond involving at least one
    # hydrogen, so the renderer can hide the whole bond (both halves)
    # when the user toggles hydrogens off — otherwise the cylinder stubs
    # are left dangling into empty space.
    cylinder_h_flags = collect(Iterators.flatten(
        map(s -> let hf = (s[1].element == Elements.H || s[2].element == Elements.H)
                (hf, hf)
            end, sticks)))

    Representation{T}(
        primitives=Dict("spheres" => spheres, "cylinders" => cylinders),
        meta_data=meta_data,
        colors=Dict(
            "sphere_colors"           => sphere_colors,
            "cylinder_colors"         => cylinder_colors,
            "sphere_colors_qutemol"   => sphere_colors_qutemol,
            "cylinder_colors_qutemol" => cylinder_colors_qutemol,
        ),
        flags=Dict(
            "cylinder_h_flags" => cylinder_h_flags,
        ),
    )
end
