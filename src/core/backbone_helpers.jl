# Math + color helpers shared across the backbone / ribbon / cartoon
# pipeline. Originally written by Dorothee Brohl in `src/helpers/utils.jl`
# of her fork; lifted here essentially unchanged so the spline + frame
# code can be ported without surface-area changes.
#
# `handle_multichain_model` and `get_string_color` from the original
# file are deliberately NOT carried over yet — they depend on
# `Representation`, `merge_representations` and a `Color` enum that we
# wire up later in the backbone entry point.

"""
    hsv_to_rgb(hue, saturation, value) -> NTuple{3, Int}

Returns `(R, G, B)` in `[0, 255]`. `hue` in `[0, 360]`, `saturation`
and `value` in `[0, 1]`. Following
<https://de.wikipedia.org/wiki/HSV-Farbraum#Umrechnung_HSV_in_RGB>.
"""
function hsv_to_rgb(hue, saturation, value)
    hi = floor(hue / 60)
    f  = (hue / 60 - hi)
    p  = value * (1 - saturation)
    q  = value * (1 - saturation * f)
    t  = value * (1 - saturation * (1 - f))

    value = Int(round(value * 255))
    t     = Int(round(t * 255))
    p     = Int(round(p * 255))
    q     = Int(round(q * 255))

    if hi == 0 || hi == 6
        return (value, t, p)
    elseif hi == 1
        return (q, value, p)
    elseif hi == 2
        return (p, value, t)
    elseif hi == 3
        return (p, q, value)
    elseif hi == 4
        return (t, p, value)
    else
        return (value, p, q)
    end
end

"""
    rgb_to_hex(rgb; prefix="") -> String

Two-digits-per-channel hex string. With `prefix="#"`, produces the
6-digit CSS hex form (`"#ff8800"`).
"""
function rgb_to_hex(rgb::NTuple{3, Int}; prefix::AbstractString="")
    result = prefix
    for channel in 1:3
        hex = string(rgb[channel], base=16)
        if length(hex) == 1
            hex = "0" * hex
        end
        result *= hex
    end
    return result
end

"""
    hex_to_rgb(hex) -> NTuple{3, Int}

Parses a hex color into an `(R, G, B)` tuple. Strips an optional
`#` (or any non-hex character) prefix.
"""
function hex_to_rgb(hex::AbstractString)
    for i in length(hex)-1:-1:1
        c = hex[i]
        if !('0' <= c <= '9' || 'a' <= c <= 'f' || 'A' <= c <= 'F')
            hex = hex[i+1:end]
            break
        end
    end
    length(hex) == 6 || throw(ArgumentError("hex string with length != 6: $hex"))
    return (parse(Int, hex[1:2], base=16),
            parse(Int, hex[3:4], base=16),
            parse(Int, hex[5:6], base=16))
end

"""
    rainbow(pos) -> NTuple{3, Int}

Single-parameter rainbow color. `pos` in `[0, 1]` drives the hue,
saturation and value are pinned to 1.
"""
rainbow(pos) = hsv_to_rgb(pos * 360, 1, 1)

"""
    n_colors(n) -> Vector{NTuple{3, Int}}

`n` evenly-spaced rainbow colors. Used to assign per-chain colors when
the user picks `Color.CHAIN` for a backbone / ribbon / cartoon
representation.
"""
function n_colors(n)
    colors = Vector{NTuple{3, Int}}(undef, n)
    for (i, hue) in enumerate(collect(range(0, 360, n + 1))[1:end-1])
        colors[i] = hsv_to_rgb(hue, 1, 1)
    end
    return colors
end

"""
    cross!(dest, a, b)

In-place 3D cross product. Operates on three-element vectors / column
views; writes `a × b` into `dest`.
"""
function cross!(dest::AbstractArray, a::AbstractVector, b::AbstractVector)
    if !(length(a) == length(b) == length(dest) == 3)
        throw(DimensionMismatch("cross product is only defined for vectors of length 3"))
    end
    a1, a2, a3 = a
    b1, b2, b3 = b
    dest .= (a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1)
end

"""
    normalize_col!(arr, i)

Normalize the i-th column of `arr` (treated as a 3×N matrix) in
place. Used inside the spline / frame inner loops to avoid
allocating intermediate vectors.
"""
function normalize_col!(arr, i)
    dist = 0
    for j in 1:3
        dist += arr[j, i]^2
    end
    dist = sqrt(dist)
    for j in 1:3
        arr[j, i] /= dist
    end
end

"""
    approx_zero(x) -> Bool

True if `|x| < 1e-5`. Used as a numerical-stability guard around
acos and cross-product orientation checks.
"""
approx_zero(value) = abs(value) < 1e-5
