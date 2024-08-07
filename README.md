# BiochemicalVisualization
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://hildebrandtlab.github.io/BiochemicalVisualization.jl/dev)
[![Build Status](https://github.com/hildebrandtlab/BiochemicalVisualization.jl/actions/workflows/CI.yml/badge.svg?branch=develop)](https://github.com/hildebrandtlab/BiochemicalVisualization.jl/actions/workflows/CI.yml?query=branch%3Adevelop)

BiochemicalVisualization is the graphical interface for [BiochemicalAlgorithms.jl](https://github.com/hildebrandtlab/BiochemicalAlgorithms.jl), providing different representations for biomolecular systems. All representations can be visualized in the form of interactive web widgets that are embeddable in Jypyter notebooks.

# Installation
To install BiochemicalVisualization, open a Julia REPL, switch to the package mode by pressing `]`, and type


```julia
pkg> add https://github.com/hildebrandtlab/BiochemicalVisualization.jl
```

# Usage
```julia
using BiochemicalAlgorithms, BiochemicalVisualization

# Read PDB file from the BiochemicalAlgorithms.jl repository
sys = load_pdb(ball_data_path("../test/data/AlaAla.pdb"))

# Prepare molecule
fdb = FragmentDB()
normalize_names!(sys, fdb)
reconstruct_fragments!(sys, fdb)
build_bonds!(sys, fdb)

# Visualize using ball-and-stick representation
ball_and_stick(sys)
```

# Contributing
You have ideas for improvements, criticism, or ran into problems?  You are looking for a feature that you know from BALL?
Feedback and contributions are very welcome. Check out our [guidelines](CONTRIBUTING.md) and use our [issue tracker](https://github.com/hildebrandtlab/BiochemicalVisualization.jl/issues) or contact us [via e-mail](mailto:hildebrandtlab@uni-mainz.de?subject=BiochemicalVisualization.jl).
