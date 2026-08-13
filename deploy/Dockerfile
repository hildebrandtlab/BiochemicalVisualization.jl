# BiochemicalVisualization.jl — interactive viewer over JupyterLab.
#
# Serves the molecular viewer so a remote browser (e.g. an iPhone on the
# same network or over a tunnel) can drive a live Julia kernel: rotate,
# switch models, adjust opacity, etc. The browser only ever talks to
# JupyterLab's single port (8888); `jupyter-server-proxy` tunnels to the
# per-kernel Bonito server INSIDE the container, so only 8888 is exposed.
#
# BCV_JUPYTER_PROXY=1 makes Bonito emit proxy-relative URLs (required for
# any non-localhost browser). See src/BiochemicalVisualization.jl.
#
# Build context is the repository root (see docker-compose.yml).

ARG JULIA_VERSION=1.11
FROM julia:${JULIA_VERSION}-bookworm

# --- System + Jupyter -------------------------------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
        python3 python3-venv git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Jupyter in an isolated venv (Debian's Python is externally-managed).
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv "$VIRTUAL_ENV"
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN pip install --no-cache-dir jupyterlab jupyter-server-proxy

# --- Julia package ----------------------------------------------------------
# Keep the package env and the precompile cache inside the image so kernel
# startup is fast at runtime.
ENV JULIA_DEPOT_PATH=/opt/julia-depot
WORKDIR /opt/bcv

# Only what the package needs at runtime (the 7 MB JS bundle lives in
# typescript/dist; the raw TS/node_modules are not needed).
COPY Project.toml ./Project.toml
COPY src ./src
COPY assets ./assets
COPY typescript/dist ./typescript/dist

# Drop any local [sources] path override (used only for side-by-side dev of
# BiochemicalAlgorithms); the container resolves it from the registry.
RUN sed -i '/^\[sources\]/d; /^BiochemicalAlgorithms = {path/d' Project.toml

# IJulia goes into the shared depot env so it's on the stacked load path
# for `julia --project=/opt/bcv`. Then instantiate + precompile the package
# (resolves BiochemicalAlgorithms 0.7.x and Bonito 4.2.0 from the registry),
# and register a kernel that starts in this project.
RUN julia -e 'using Pkg; Pkg.add("IJulia")' \
 && julia --project=/opt/bcv -e 'using Pkg; Pkg.instantiate(); Pkg.precompile()' \
 && julia --project=/opt/bcv -e 'using IJulia; IJulia.installkernel("Julia", "--project=/opt/bcv")' \
 # Bake the package precompile cache + smoke-test that a scene renders.
 && julia --project=/opt/bcv -e 'using BiochemicalAlgorithms, BiochemicalVisualization; \
        sys = load_pdb(ball_data_path("../test/data/AlaAla.pdb")); infer_topology!(sys); \
        io = IOBuffer(); show(io, MIME"text/html"(), ball_and_stick(sys)); \
        @assert length(take!(io)) > 0; println("build smoke-test OK")'

# --- Runtime ----------------------------------------------------------------
# Proxy mode: emit /proxy/<port>/ URLs the browser resolves against the
# JupyterLab origin (works from any device, not just localhost).
ENV BCV_JUPYTER_PROXY=1

# Notebooks live in /work. Ship the example inside the image so it works
# even with no volume mounted; docker-compose mounts deploy/notebooks over
# it by default (host copy then wins and persists edits).
COPY deploy/notebooks /work

EXPOSE 8888
CMD ["jupyter", "lab", \
     "--ip=0.0.0.0", "--port=8888", "--no-browser", "--allow-root", \
     "--ServerApp.root_dir=/work"]
