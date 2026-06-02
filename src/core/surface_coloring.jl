# Surface coloring methods, ported from BALLView's ColorProcessors
# (BALL/source/VIEW/MODELS/standardColorProcessor.C). Each method takes
# the atom container and returns one color per atom; surface meshes pick
# up the color of their nearest atom.

export
    SURFACE_COLOR_METHODS,
    surface_vertex_colors

const SURFACE_COLOR_METHODS = (
    "element", "chain", "residue", "residue_index", "solid",
)

const _SURFACE_DEFAULT_SOLID = "#cccccc"

# Distinct chain / molecule palette. The exact values aren't important —
# BALLView generates them via PositionColorProcessor; this is a stable
# 12-step palette with good visual separation.
const _CHAIN_PALETTE = (
    "#e6194b", "#3cb44b", "#ffe119", "#4363d8",
    "#f58231", "#911eb4", "#46f0f0", "#f032e6",
    "#bcf60c", "#fabebe", "#008080", "#9a6324",
)

# Residue-name palette taken verbatim from BALLView's
# ResidueNameColorProcessor (the amino-acid table at the top of
# standardColorProcessor.C).
const _RESIDUE_COLORS = Dict(
    "GLY" => (255, 255, 255), "ALA" => (216, 255, 255),
    "VAL" => (205, 126, 255), "LEU" => (196, 255,   0),
    "ILE" => (255, 182, 182), "SER" => (144, 144, 144),
    "THR" => (142, 142, 255), "CYS" => (240,   0,   0),
    "MET" => (179, 255, 255), "PRO" => (175, 226, 244),
    "ASP" => (170,  93, 242), "ASN" => (137, 255,   0),
    "GLU" => (209, 165, 165), "GLN" => (128, 154, 154),
    "LYS" => (255, 128,   0), "ARG" => (255, 200,  40),
    "HIS" => ( 26, 240,  26), "PHE" => (128, 209, 228),
    "TYR" => (142,  65, 211), "TRP" => ( 61, 255,   0),
)
const _RESIDUE_DEFAULT = (255, 255, 255)

_rgb_to_hex(rgb::Tuple{Int, Int, Int}) =
    "#" * lowercase(hex(RGB((rgb ./ 255)...)))

# HSV → hex helper for the residue-index gradient. h in [0,1].
function _hsv_hex(h::Real, s::Real=0.7, v::Real=1.0)
    h = clamp(h, 0.0, 1.0)
    "#" * lowercase(hex(HSV(360 * h, s, v)))
end

# --- per-atom color arrays for each method ---

function _atom_colors_element(ac)
    [element_color(e) for e in atoms(ac).element]
end

function _atom_colors_chain(ac)
    chain_to_color = Dict{Any, String}()
    next_idx = 1
    n_palette = length(_CHAIN_PALETTE)
    map(atoms(ac)) do a
        key = a.chain_idx
        if !haskey(chain_to_color, key)
            chain_to_color[key] = _CHAIN_PALETTE[((next_idx - 1) % n_palette) + 1]
            next_idx += 1
        end
        chain_to_color[key]
    end
end

function _atom_colors_residue(ac)
    map(atoms(ac)) do a
        f = parent_fragment(a)
        rgb = (isnothing(f) ? _RESIDUE_DEFAULT
                            : get(_RESIDUE_COLORS, uppercase(String(f.name)), _RESIDUE_DEFAULT))
        _rgb_to_hex(rgb)
    end
end

function _atom_colors_residue_index(ac)
    # Build a per-fragment index normalized to [0,1] along the chain,
    # then map each atom to the hue of its fragment.
    frag_idx_to_hue = Dict{Any, Float64}()
    # Collect unique fragment idxs in order of appearance.
    seen = Set{Any}()
    order = Any[]
    for a in atoms(ac)
        f = parent_fragment(a)
        f === nothing && continue
        if !(f.idx in seen)
            push!(order, f.idx)
            push!(seen, f.idx)
        end
    end
    n = max(length(order) - 1, 1)
    for (i, idx) in enumerate(order)
        frag_idx_to_hue[idx] = (i - 1) / n
    end
    map(atoms(ac)) do a
        f = parent_fragment(a)
        h = (f === nothing) ? 0.0 : get(frag_idx_to_hue, f.idx, 0.0)
        _hsv_hex(h)
    end
end

function _atom_colors_solid(ac, solid_color)
    fill(solid_color, length(atoms(ac)))
end

"""
    atom_colors(ac; method, solid_color)

Compute one hex color string per atom in `ac` using the given coloring
method. `method` is one of `SURFACE_COLOR_METHODS`. `solid_color` is only
consulted when `method == "solid"`.
"""
function atom_colors(ac; method::AbstractString="element",
                    solid_color::AbstractString=_SURFACE_DEFAULT_SOLID)
    if method == "element"
        _atom_colors_element(ac)
    elseif method == "chain"
        _atom_colors_chain(ac)
    elseif method == "residue"
        _atom_colors_residue(ac)
    elseif method == "residue_index"
        _atom_colors_residue_index(ac)
    elseif method == "solid"
        _atom_colors_solid(ac, solid_color)
    else
        throw(ArgumentError("unknown surface coloring method: $(method); valid: $(SURFACE_COLOR_METHODS)"))
    end
end

"""
    surface_vertex_colors(vertices, ac; method, solid_color)

Compute one hex color per surface vertex. Each vertex inherits the
color of its nearest atom. `vertices` is a vector of `Point3{T}` (or
similar) in world space.
"""
function surface_vertex_colors(vertices, ac;
                                method::AbstractString="element",
                                solid_color::AbstractString=_SURFACE_DEFAULT_SOLID)
    per_atom = atom_colors(ac; method, solid_color)
    if method == "solid"
        return fill(per_atom[1], length(vertices))
    end
    atom_pos = collect(atoms(ac).r)
    n_atoms = length(atom_pos)
    [per_atom[_nearest_atom(v, atom_pos, n_atoms)] for v in vertices]
end

@inline function _nearest_atom(v, atom_pos, n_atoms)
    best_d2 = Inf
    best_j = 1
    @inbounds for j in 1:n_atoms
        dx = v[1] - atom_pos[j][1]
        dy = v[2] - atom_pos[j][2]
        dz = v[3] - atom_pos[j][3]
        d2 = dx*dx + dy*dy + dz*dz
        if d2 < best_d2
            best_d2 = d2
            best_j = j
        end
    end
    best_j
end
