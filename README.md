# BiochemicalVisualization
[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://hildebrandtlab.github.io/BiochemicalVisualization.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://hildebrandtlab.github.io/BiochemicalVisualization.jl/dev)
[![Build Status](https://github.com/hildebrandtlab/BiochemicalVisualization.jl/actions/workflows/CI.yml/badge.svg?branch=develop)](https://github.com/hildebrandtlab/BiochemicalVisualization.jl/actions/workflows/CI.yml?query=branch%3Adevelop)

BiochemicalVisualization is the graphical interface for [BiochemicalAlgorithms.jl](https://github.com/hildebrandtlab/BiochemicalAlgorithms.jl), providing different representations for biomolecular systems. All representations can be visualized in the form of interactive web widgets that are embeddable in Jypyter notebooks.

## Installation
To install BiochemicalVisualization, open a Julia REPL, switch to the package mode by pressing `]`, and type


```julia
pkg> add BiochemicalVisualization
```

### JupyterLab — required Python dependency

When you use BiochemicalVisualization inside a JupyterLab (or Jupyter
Notebook) session, the rendered cell talks back to the Julia kernel
over a WebSocket served by [Bonito.jl]. JupyterLab does not expose
arbitrary kernel-side ports to the browser by default; the WebSocket
has to be routed through **[jupyter-server-proxy]**.

Install it into the same Python environment that runs JupyterLab:

```bash
pip install "jupyter-server-proxy>=4.5.0"
```

Restart JupyterLab afterwards. You can verify the extension is active
with:

```bash
jupyter server extension list | grep server_proxy
```

Without `jupyter-server-proxy` the 3D view will appear but no model
data ever reaches the browser — the connection looks broken because
the WebSocket can't reach Julia.

[Bonito.jl]: https://github.com/SimonDanisch/Bonito.jl
[jupyter-server-proxy]: https://jupyter-server-proxy.readthedocs.io/

### Troubleshooting: 403s on `/proxy/<port>/…`

If the JupyterLab server log shows repeated `403 GET /proxy/<port>/…`
warnings, the port baked into the page no longer points at the live
Julia kernel — usually because a **previous kernel is still listening
on that port** and Bonito picked a different one for the current
session. Shut down the stale kernel ("Running" tab in JupyterLab →
"Shut down" everything you don't need) and reload the notebook page;
the new cell will be rendered with the now-correct port.

## Usage
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
![Ball-and-stick representation of a simple molecule](https://raw.githubusercontent.com/hildebrandtlab/BiochemicalVisualization.jl/develop/docs/src/tutorials/gfx/ball-and-stick.png)

## Contributing
You have ideas for improvements, criticism, or ran into problems?  You are looking for a feature that you know from BALL?
Feedback and contributions are very welcome. Check out our [guidelines](CONTRIBUTING.md) and use our [issue tracker](https://github.com/hildebrandtlab/BiochemicalVisualization.jl/issues) or contact us [via e-mail](mailto:hildebrandtlab@uni-mainz.de?subject=BiochemicalVisualization.jl).

## Citing
If you use BiochemicalVisualization.jl in your research, please cite the following publication:
> Leclaire et al., (2025). Structure-based bioinformatics with BiochemicalAlgorithms.jl.
> Proceedings of the JuliaCon Conferences, 7(78), 188, <https://doi.org/10.21105/jcon.00188>
