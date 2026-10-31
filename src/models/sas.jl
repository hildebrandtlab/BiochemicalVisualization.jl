# Solvent-Accessible Surface (SAS) — triangulated mesh from
# BiochemicalAlgorithms' triangulate_sas, wrapped in our Representation
# wire format.

function prepare_sas_model(
        ac::AbstractAtomContainer{T};
        probe_radius=T(1.5),
        density=T(1.0),
        coloring::AbstractString="element",
        solid_color::AbstractString="#cccccc") where {T<:Real}
    _prepare_surface_model(ac;
        triangulate = (a; pr, d) -> triangulate_sas(a; probe_radius=pr, density=d),
        probe_radius, density, coloring, solid_color)
end
