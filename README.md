# BiochemicalVisualization
[![Stable](https://img.shields.io/badge/docs-stable-blue.svg)](https://hildebrandtlab.github.io/BiochemicalVisualization.jl/stable)
[![Dev](https://img.shields.io/badge/docs-dev-blue.svg)](https://hildebrandtlab.github.io/BiochemicalVisualization.jl/dev)
[![Build Status](https://github.com/hildebrandtlab/BiochemicalVisualization.jl/actions/workflows/CI.yml/badge.svg?branch=develop)](https://github.com/hildebrandtlab/BiochemicalVisualization.jl/actions/workflows/CI.yml?query=branch%3Adevelop)

BiochemicalVisualization is the graphical interface for [BiochemicalAlgorithms.jl](https://github.com/hildebrandtlab/BiochemicalAlgorithms.jl), providing different representations for biomolecular systems. All representations can be visualized in the form of interactive web widgets that are embeddable in Jupyter notebooks.

## Installation
BiochemicalVisualization ≥ 0.4 requires **Julia ≥ 1.11** (it builds on
[Bonito.jl] 5). On Julia 1.10, the package manager will install the
older 0.3.x series instead.

To install BiochemicalVisualization, open a Julia REPL, switch to the package mode by pressing `]`, and type


```julia
pkg> add BiochemicalVisualization
```

### JupyterLab

Inside a JupyterLab (or Jupyter Notebook) session, the rendered cell
talks back to the Julia kernel over a WebSocket served by [Bonito.jl].

For a **local** JupyterLab — browser and kernel on the same machine,
the usual case — this works out of the box: the page connects directly
to the kernel's Bonito server on `localhost`. No additional
dependencies are needed.

For a **remote or HTTPS** setup (JupyterHub, a container, or any case
where the browser can only reach JupyterLab's own port), the WebSocket
must be routed through **[jupyter-server-proxy]** instead:

1. Install it into the Python environment that runs JupyterLab, then
   restart JupyterLab:

   ```bash
   pip install "jupyter-server-proxy>=4.5.0"
   ```

   You can verify the extension is active with:

   ```bash
   jupyter server extension list | grep server_proxy
   ```

2. Set `BCV_JUPYTER_PROXY=1` in the kernel's environment (e.g. export
   it before starting JupyterLab, or run
   `ENV["BCV_JUPYTER_PROXY"] = "1"` at the top of the notebook before
   the first plot). BiochemicalVisualization then emits page-relative
   `/proxy/<port>/…` URLs that the browser resolves against the
   JupyterLab origin — on an HTTPS page the WebSocket upgrades to
   `wss://` automatically.

A ready-made `docker compose` deployment using this proxy mode (e.g.
for viewing structures from a phone) ships in
[`deploy/`](https://github.com/hildebrandtlab/BiochemicalVisualization.jl/tree/develop/deploy).

> **Note:** cell output rendered by a *previous* kernel still points at
> that kernel's (now shut down) Bonito server, so the widget appears
> but never updates — in proxy mode this shows up as
> `403 GET /proxy/<port>/…` in the JupyterLab log. Re-run the
> notebook's cells after a kernel restart.

[Bonito.jl]: https://github.com/SimonDanisch/Bonito.jl
[jupyter-server-proxy]: https://jupyter-server-proxy.readthedocs.io/

## Usage
```julia
using BiochemicalAlgorithms, BiochemicalVisualization

# Read PDB file from the BiochemicalAlgorithms.jl repository
sys = load_pdb(ball_data_path("../test/data/AlaAla.pdb"))

# Prepare molecule
infer_topology!(sys)
assign_radii!(sys)

# Visualize using ball-and-stick representation
ball_and_stick(sys)
```
![Ball-and-stick representation of a simple molecule](https://raw.githubusercontent.com/hildebrandtlab/BiochemicalVisualization.jl/develop/docs/src/tutorials/gfx/ball-and-stick.png)

## Contributing
You have ideas for improvements, criticism, or ran into problems?  You are looking for a feature that you know from BALL?
Feedback and contributions are very welcome. Check out our [guidelines](CONTRIBUTING.md) and use our [issue tracker](https://github.com/hildebrandtlab/BiochemicalVisualization.jl/issues) or contact us [via e-mail](mailto:hildebrandtlab@uni-mainz.de?subject=BiochemicalVisualization.jl).

## Acknowledgements

The backbone / ribbon / cartoon representations (and the supporting
spline, frame-construction and mesh-stitching code in `src/core/`)
were originally written by **Dorothee Brohl**
(`dbrohl@students.uni-mainz.de`) in an earlier fork of this package
and ported into the current architecture. Authorship is preserved in
`git log` on every port commit.

## Citing
If you use BiochemicalVisualization.jl in your research, please cite the following publication:
> Leclaire et al., (2025). Structure-based bioinformatics with BiochemicalAlgorithms.jl.
> Proceedings of the JuliaCon Conferences, 7(78), 188, <https://doi.org/10.21105/jcon.00188>
