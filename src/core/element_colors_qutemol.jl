
# Element color palette as used by QuteMol (https://qutemol.sourceforge.net/),
# transcribed from `tmp/qutemol/src/AtomColor.cpp` (the active hex column,
# not the CPK comment column). Entries originally written as `0xFF1493`
# (deep pink) in QuteMol are deliberate placeholders for elements that were
# never given a custom color; we preserve them as-is to match QuteMol's
# rendered output faithfully.
#
# QuteMol then applies a shader transform `bri * (sat * color + (1-sat) * 255)`.
# We bake the qutemol2.preset values (sat=0.6, bri=1.0) into the table so the
# emitted hex matches what QuteMol would draw on screen.

const _QUTEMOL_PLACEHOLDER = (0xFF, 0x14, 0x93)

const _QUTEMOL_RAW_COLORS = Tuple{Int, Int, Int}[
    (0xFF, 0xFF, 0xFF),  # 1   H
    (0xFF, 0xC0, 0xCB),  # 2   He
    (0xB2, 0x22, 0x22),  # 3   Li
    _QUTEMOL_PLACEHOLDER, # 4   Be
    (0x00, 0xFF, 0x00),  # 5   B
    (0x80, 0x80, 0x80),  # 6   C
    (0x8F, 0x8F, 0xFF),  # 7   N
    (0xF0, 0x00, 0x00),  # 8   O
    (0xDA, 0xA5, 0x20),  # 9   F
    _QUTEMOL_PLACEHOLDER, # 10  Ne
    (0x00, 0x00, 0xFF),  # 11  Na
    (0x22, 0x8B, 0x22),  # 12  Mg
    (0x80, 0x80, 0x90),  # 13  Al
    (0xDA, 0xA5, 0x20),  # 14  Si
    (0xFF, 0xA5, 0x00),  # 15  P
    (0xFF, 0xC8, 0x32),  # 16  S
    (0x00, 0xFF, 0x00),  # 17  Cl
    _QUTEMOL_PLACEHOLDER, # 18  Ar
    _QUTEMOL_PLACEHOLDER, # 19  K
    (0x80, 0x80, 0x90),  # 20  Ca
    _QUTEMOL_PLACEHOLDER, # 21  Sc
    (0x80, 0x80, 0x90),  # 22  Ti
    _QUTEMOL_PLACEHOLDER, # 23  V
    (0x80, 0x80, 0x90),  # 24  Cr
    (0x80, 0x80, 0x90),  # 25  Mn
    (0xFF, 0xA5, 0x00),  # 26  Fe
    _QUTEMOL_PLACEHOLDER, # 27  Co
    (0xA5, 0x2A, 0x2A),  # 28  Ni
    (0xA5, 0x2A, 0x2A),  # 29  Cu
    (0xA5, 0x2A, 0x2A),  # 30  Zn
    _QUTEMOL_PLACEHOLDER, # 31  Ga
    _QUTEMOL_PLACEHOLDER, # 32  Ge
    _QUTEMOL_PLACEHOLDER, # 33  As
    _QUTEMOL_PLACEHOLDER, # 34  Se
    (0xA5, 0x2A, 0x2A),  # 35  Br
    _QUTEMOL_PLACEHOLDER, # 36  Kr
    _QUTEMOL_PLACEHOLDER, # 37  Rb
    _QUTEMOL_PLACEHOLDER, # 38  Sr
    _QUTEMOL_PLACEHOLDER, # 39  Y
    _QUTEMOL_PLACEHOLDER, # 40  Zr
    _QUTEMOL_PLACEHOLDER, # 41  Nb
    _QUTEMOL_PLACEHOLDER, # 42  Mo
    _QUTEMOL_PLACEHOLDER, # 43  Tc
    _QUTEMOL_PLACEHOLDER, # 44  Ru
    _QUTEMOL_PLACEHOLDER, # 45  Rh
    _QUTEMOL_PLACEHOLDER, # 46  Pd
    (0x80, 0x80, 0x90),  # 47  Ag
    _QUTEMOL_PLACEHOLDER, # 48  Cd
    _QUTEMOL_PLACEHOLDER, # 49  In
    _QUTEMOL_PLACEHOLDER, # 50  Sn
    _QUTEMOL_PLACEHOLDER, # 51  Sb
    _QUTEMOL_PLACEHOLDER, # 52  Te
    (0xA0, 0x20, 0xF0),  # 53  I
    _QUTEMOL_PLACEHOLDER, # 54  Xe
    _QUTEMOL_PLACEHOLDER, # 55  Cs
    (0xFF, 0xA5, 0x00),  # 56  Ba
]

# Lanthanides 57–71, all placeholders.
append!(_QUTEMOL_RAW_COLORS, fill(_QUTEMOL_PLACEHOLDER, 71 - 56))

# 72 Hf .. 78 Pt: all placeholders in QuteMol.
append!(_QUTEMOL_RAW_COLORS, fill(_QUTEMOL_PLACEHOLDER, 78 - 71))

push!(_QUTEMOL_RAW_COLORS, (0xDA, 0xA5, 0x20))  # 79  Au

# 80 Hg through 110: all placeholders.
append!(_QUTEMOL_RAW_COLORS, fill(_QUTEMOL_PLACEHOLDER, 110 - 79))

# qutemol2.preset shader pre-bake: result = bri * (sat * color + (1-sat) * 255)
const _QUTEMOL_SAT = 0.6
const _QUTEMOL_BRI = 1.0

function _qutemol_apply_sat(rgb::Tuple{Int, Int, Int})
    sat, bri = _QUTEMOL_SAT, _QUTEMOL_BRI
    map(c -> clamp(round(Int, bri * (sat * c + (1.0 - sat) * 255)), 0, 255), rgb)
end

const ELEMENT_COLORS_QUTEMOL = [_qutemol_apply_sat(c) for c in _QUTEMOL_RAW_COLORS]
const _hex_colors_qutemol = [hex(RGB((c ./ 255)...)) for c in ELEMENT_COLORS_QUTEMOL]

function element_color_qutemol(e)
    i = Int(e)
    if i < 1 || i > length(_hex_colors_qutemol)
        return "#" * lowercase(_hex_colors_qutemol[end])
    end
    "#" * lowercase(_hex_colors_qutemol[i])
end
