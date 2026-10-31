# Configuration record + palette tables for the backbone / ribbon /
# cartoon representations. Adapted from
# `src/models/backbone/backbone_config.jl` and the `AA_COLORS` /
# `SS_COLORS` constants of `src/core/visualize.jl` in Dorothee Brohl's
# fork. Three structural changes from the originals:
#
#   1. The fork uses five `EnumX` enums (`BackboneType`, `Spline`,
#      `ControlPoints`, `Frame`, `Filter`) plus a `Color` enum in
#      core/config.jl. We drop the EnumX dep and represent each tag
#      with a `Symbol` instead — consumer code uses simple `==`
#      checks, so the change is local.
#
#   2. The `PartialBackboneConfig` / `complete_config` / `add_to_config!`
#      machinery is gone. The current BCV `*!` API takes kwargs
#      directly, so the merge-with-defaults pattern collapses into
#      `BackboneConfig(...)` constructors with default arguments.
#
#   3. SS_COLORS is keyed by the current BCA's `SecondaryStructureType`
#      enum (Coil/Helix/Strand/Turn/Unknown), not the fork's
#      HELIX/SHEET/NONE values.

export BackboneConfig, BACKBONE_COLOR_METHODS

# All Symbol-tagged choice sets exposed by the backbone API.
const BACKBONE_TYPES         = (:backbone, :ribbon, :cartoon)
const BACKBONE_SPLINES       = (:linear, :catmull_rom, :cubic_b)
const BACKBONE_CTRL_POINTS   = (:c_alpha, :mid_points)
const BACKBONE_FRAMES        = (:rmf, :second_spline)
const BACKBONE_FILTERS       = (:none, :angle)
const BACKBONE_COLOR_METHODS = (:uniform, :chain, :rainbow,
                                :secondary_structure, :residue)

"""
    BackboneConfig{T}

Bundle of parameters driving the backbone-based representations.
Constructed by the convenience preparers (`prepare_backbone_model`,
`prepare_ribbon_model`, `prepare_cartoon_model`); end users normally
override individual fields via kwargs to those preparers.

Fields:

- `tube_radius`         — half-width of the backbone tube (Å).
- `resolution_along`    — samples per Å along the spline; ≥ 0.7.
- `resolution_cross`    — vertices per cross-section ring; ≥ 3.
- `backbone_type`       — `:backbone` / `:ribbon` / `:cartoon`.
- `color`               — `:uniform` / `:chain` / `:rainbow` /
                          `:secondary_structure` / `:residue`.
- `spline`              — `:linear` / `:catmull_rom` / `:cubic_b`.
- `control_point_strategy` — `:c_alpha` (control points = CA atoms) /
                          `:mid_points` (Carson & Bugg construction).
- `frame`               — `:rmf` (rotation-minimizing frames) /
                          `:second_spline` (Carson & Bugg dual spline).
- `filter`              — `:none` / `:angle` (curvature-based decimation).
"""
mutable struct BackboneConfig{T<:Real}
    tube_radius::T
    resolution_along::T
    resolution_cross::Int
    backbone_type::Symbol
    color::Symbol
    spline::Symbol
    control_point_strategy::Symbol
    frame::Symbol
    filter::Symbol
end

# Default kwarg constructor; each preparer overrides defaults as needed.
function BackboneConfig{T}(;
        tube_radius            = T(0.2),
        resolution_along       = T(1.5),
        resolution_cross       = 12,
        backbone_type::Symbol  = :backbone,
        color::Symbol          = :rainbow,
        spline::Symbol         = :cubic_b,
        control_point_strategy::Symbol = :mid_points,
        frame::Symbol          = :rmf,
        filter::Symbol         = :angle) where T<:Real
    BackboneConfig{T}(T(tube_radius), T(resolution_along), Int(resolution_cross),
                      backbone_type, color, spline, control_point_strategy,
                      frame, filter)
end

function Base.:(==)(a::BackboneConfig{T}, b::BackboneConfig{U}) where {T, U}
    T == U &&
    a.tube_radius            == b.tube_radius            &&
    a.resolution_along       == b.resolution_along       &&
    a.resolution_cross       == b.resolution_cross       &&
    a.backbone_type          == b.backbone_type          &&
    a.color                  == b.color                  &&
    a.spline                 == b.spline                 &&
    a.control_point_strategy == b.control_point_strategy &&
    a.frame                  == b.frame                  &&
    a.filter                 == b.filter
end

# ----- Palette tables for the backbone preparers -----

"""
    SS_COLORS::Dict{SecondaryStructureType, NTuple{3, Int}}

Per-secondary-structure RGB triplets. Values taken from BALLView's
defaults — pink for helices, orange for strands, white otherwise.
Used when `BackboneConfig.color == :secondary_structure`.
"""
const SS_COLORS = Dict(
    SecondaryStructureElement.Coil    => (255, 255, 255),
    SecondaryStructureElement.Helix   => (255,  75, 120),
    SecondaryStructureElement.Strand  => (255, 150,   0),
    SecondaryStructureElement.Turn    => (255, 255, 255),
    SecondaryStructureElement.Unknown => (255, 255, 255),
)

"""
    AA_COLORS::Dict{String, NTuple{3, Int}}

Per-amino-acid RGB triplets. Distinct from the surface-coloring
palette in `src/core/surface_coloring.jl` (which mirrors BALLView's
*ResidueNameColorProcessor*); this table is the one Dorothee Brohl's
fork uses for cartoon ribbons, and is kept verbatim so the visual
output matches her tests.
"""
const AA_COLORS = Dict{String, NTuple{3, Int}}(
    "ALA" => (199,  33, 221),  "ARG" => (209,  74,   0),
    "ASN" => (  0, 140,   0),  "ASP" => (  0, 127, 177),
    "CYS" => (209, 172,   0),  "GLN" => (135,   0,  54),
    "GLU" => (255, 143, 161),  "GLY" => (  0,   0, 139),
    "HIS" => ( 46, 255, 113),  "ILE" => (103,  82,   0),
    "LEU" => (  0, 208, 217),  "LYS" => (  0,  80,  67),
    "MET" => (126, 116, 126),  "PHE" => (163, 189, 255),
    "PRO" => (149, 160, 135),  "SER" => (255, 172, 121),
    "THR" => ( 94,  35,   0),  "TRP" => (255, 255, 160),
    "TYR" => ( 73,  62,  94),  "VAL" => (255, 136, 255),
    "PYL" => (241,   0,  79),  "SEC" => (  0, 139, 118),
    "ASX" => (  0,  78, 193),  "XLE" => ( 42,   0,  23),
    "GLX" => (255, 217, 255),  "XAA" => (189, 171, 168),
    "TER" => ( 38,  42,   0),  "GAP" => (182, 249, 217),
)
const _AA_DEFAULT = (192, 192, 192)
