
# Van der Waals radii (in Å), indexed by atomic number.
# Values follow Bondi (1964, J. Phys. Chem. 68, 441) and Mantina et al.
# (2009, J. Phys. Chem. A 113, 5806) where published. For elements without
# a reliable published value, a generic 2.00 Å fallback is used; the trailing
# "UNKNOWN" entry mirrors ELEMENT_COLORS so out-of-range lookups behave the
# same way as for colors.

const ELEMENT_VDW_RADII = [
    1.20,   # HYDROGEN 1
    1.40,   # HELIUM 2
    1.82,   # LITHIUM 3
    1.53,   # BERYLLIUM 4
    1.92,   # BORON 5
    1.70,   # CARBON 6
    1.55,   # NITROGEN 7
    1.52,   # OXYGEN 8
    1.47,   # FLUORINE 9
    1.54,   # NEON 10
    2.27,   # SODIUM 11
    1.73,   # MAGNESIUM 12
    1.84,   # ALUMINIUM 13
    2.10,   # SILICON 14
    1.80,   # PHOSPHORUS 15
    1.80,   # SULFUR 16
    1.75,   # CHLORINE 17
    1.88,   # ARGON 18
    2.75,   # POTASSIUM 19
    2.31,   # CALCIUM 20
    2.11,   # SCANDIUM 21
    2.00,   # TITANIUM 22
    2.00,   # VANADIUM 23
    2.00,   # CHROMIUM 24
    2.00,   # MANGANESE 25
    2.00,   # IRON 26
    2.00,   # COBALT 27
    1.63,   # NICKEL 28
    1.40,   # COPPER 29
    1.39,   # ZINC 30
    1.87,   # GALLIUM 31
    2.11,   # GERMANIUM 32
    1.85,   # ARSENIC 33
    1.90,   # SELENIUM 34
    1.85,   # BROMINE 35
    2.02,   # KRYPTON 36
    3.03,   # RUBIDIUM 37
    2.49,   # STRONTIUM 38
    2.00,   # YTTRIUM 39
    2.00,   # ZIRCONIUM 40
    2.00,   # NIOBIUM 41
    2.00,   # MOLYBDENUM 42
    2.00,   # TECHNETIUM 43
    2.00,   # RUTHENIUM 44
    2.00,   # RHODIUM 45
    1.63,   # PALLADIUM 46
    1.72,   # SILVER 47
    1.58,   # CADMIUM 48
    1.93,   # INDIUM 49
    2.17,   # TIN 50
    2.06,   # ANTIMONY 51
    2.06,   # TELLURIUM 52
    1.98,   # IODINE 53
    2.16,   # XENON 54
    3.43,   # CAESIUM 55
    2.68,   # BARIUM 56
    2.00,   # LANTHANUM 57
    2.00,   # CERIUM 58
    2.00,   # PRASEODYMIUM 59
    2.00,   # NEODYMIUM 60
    2.00,   # PROMETHIUM 61
    2.00,   # SAMARIUM 62
    2.00,   # EUROPIUM 63
    2.00,   # GADOLINIUM 64
    2.00,   # TERBIUM 65
    2.00,   # DYSPROSIUM 66
    2.00,   # HOLMIUM 67
    2.00,   # ERBIUM 68
    2.00,   # THULIUM 69
    2.00,   # YTTERBIUM 70
    2.00,   # LUTETIUM 71
    2.00,   # HAFNIUM 72
    2.00,   # TANTALUM 73
    2.00,   # TUNGSTEN 74
    2.00,   # RHENIUM 75
    2.00,   # OSMIUM 76
    2.00,   # IRIDIUM 77
    1.75,   # PLATINUM 78
    1.66,   # GOLD 79
    1.55,   # MERCURY 80
    1.96,   # THALLIUM 81
    2.02,   # LEAD 82
    2.07,   # BISMUTH 83
    1.97,   # POLONIUM 84
    2.02,   # ASTATINE 85
    2.20,   # RADON 86
    3.48,   # FRANCIUM 87
    2.83,   # RADIUM 88
    2.00,   # ACTINIUM 89
    2.00,   # THORIUM 90
    2.00,   # PROTACTINIUM 91
    1.86,   # URANIUM 92
    2.00,   # NEPTUNIUM 93
    2.00,   # PLUTONIUM 94
    2.00,   # AMERICIUM 95
    2.00,   # CURIUM 96
    2.00,   # BERKELIUM 97
    2.00,   # CALIFORNIUM 98
    2.00,   # EINSTEINIUM 99
    2.00,   # FERMIUM 100
    2.00,   # MENDELEVIUM 101
    2.00,   # NOBELIUM 102
    2.00,   # LAWRENCIUM 103
    2.00,   # RUTHERFORDIUM 104
    2.00,   # HAHNIUM 105
    2.00,   # SEABORGIUM 106
    2.00,   # BOHRIUM 107
    2.00,   # HASSIUM 108
    2.00,   # MEITNERIUM 109
    2.00,   # DARMSTADTIUM 110
    2.00    # UNKNOWN
]

element_vdw_radius(e) = get(ELEMENT_VDW_RADII, Int(e), ELEMENT_VDW_RADII[end])
