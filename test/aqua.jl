@testitem "Aqua" begin
    using Aqua
    using MsgPack

    Aqua.test_all(BiochemicalVisualization;
        # workaround for https://github.com/hildebrandtlab/BiochemicalVisualization.jl/issues/10
        piracies = (; treat_as_own = [MsgPack.msgpack_type])
    )
end
