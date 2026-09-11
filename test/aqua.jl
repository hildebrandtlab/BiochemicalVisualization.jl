@testitem "Aqua" begin
    using Aqua
    using Bonito
    using MsgPack

    Aqua.test_all(BiochemicalVisualization;
        # workaround for https://github.com/hildebrandtlab/BiochemicalVisualization.jl/issues/10
        piracies = (; treat_as_own = [
            MsgPack.msgpack_type,
            # Intentional override: Bonito's stock implementation
            # emits absolute proxy URLs based on IJulia.profile["ip"],
            # which breaks the JupyterLab cookie origin when the user
            # opens the lab at localhost vs. 127.0.0.1. Our override
            # returns a path-relative URL. Track upstreaming this to
            # Bonito (memory: todo_upstream_bonito_pr375.md).
            Bonito.jupyterlab_proxy_url,
        ])
    )
end
