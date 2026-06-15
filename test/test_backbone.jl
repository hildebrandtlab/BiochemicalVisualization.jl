# Regression tests for the backbone / ribbon / cartoon port. Covers
# the pure helpers, the PlainMesh / TriangleMesh layer, and the
# BackboneConfig validation. End-to-end preparer behavior is exercised
# in the manual JupyterLab smoke run (the algorithm depends on
# secondary-structure assignment + atom-iteration order that fabricated
# tiny chains don't reliably exercise).

@testitem "backbone color helpers" begin
    using BiochemicalVisualization: hsv_to_rgb, rgb_to_hex, hex_to_rgb, n_colors,
                                    rainbow, approx_zero

    # HSV → RGB primaries.
    @test hsv_to_rgb(0,   1, 1) == (255,   0,   0)
    @test hsv_to_rgb(120, 1, 1) == (  0, 255,   0)
    @test hsv_to_rgb(240, 1, 1) == (  0,   0, 255)
    @test hsv_to_rgb(0,   0, 1) == (255, 255, 255)
    @test hsv_to_rgb(0,   1, 0) == (  0,   0,   0)

    # RGB ↔ hex round-trip with various prefixes.
    @test rgb_to_hex((255, 0, 0))                 == "ff0000"
    @test rgb_to_hex((255, 0, 0); prefix = "#")   == "#ff0000"
    @test rgb_to_hex((255, 0, 0); prefix = "0x")  == "0xff0000"
    @test hex_to_rgb("ff0000")   == (255, 0, 0)
    @test hex_to_rgb("#ff0000")  == (255, 0, 0)

    # rainbow + n_colors generate distinct entries.
    @test rainbow(0.0) == (255, 0, 0)
    @test allunique(n_colors(30))

    # approx_zero treats sub-1e-5 as zero.
    @test approx_zero(0)
    @test approx_zero(1e-6)
    @test approx_zero(-1e-6)
    @test !approx_zero(1e-3)
end

@testitem "filter_points_threshold respects fixed_indices + drops flat runs" begin
    using BiochemicalVisualization: filter_points_threshold

    # Five identical tangents → flat run. The filter must still keep
    # whatever sits in `fixed_indices`, plus the first sample.
    q = repeat([1.0; 0.0; 0.0], 1, 5)
    r = repeat([0.0; 1.0; 0.0], 1, 5)
    target, n_kept = filter_points_threshold(q, r, [3])
    @test n_kept ≥ 2                        # at least first sample + fixed idx
    @test target[1] != -1                   # first sample is always kept
    @test target[3] != -1                   # fixed index is kept
    @test count(==(-1), target) ≥ 1         # at least one flat sample dropped
end

@testitem "PlainMesh → TriangleMesh adapter" begin
    using BiochemicalVisualization: PlainMesh, TriangleMesh

    pm = PlainMesh{Float64}(
        [0.0  1.0  0.5;
         0.0  0.0  1.0;
         0.0  0.0  0.0],
        [0.0  0.0  0.0;
         0.0  0.0  0.0;
         1.0  1.0  1.0],
        reshape([1, 2, 3], 3, 1),
        [(255, 0, 0), (0, 255, 0), (0, 0, 255)],
    )

    tm = TriangleMesh(pm)
    @test length(tm.positions)       == 9
    @test length(tm.normals)         == 9
    @test tm.positions[1:3]           == [0.0, 0.0, 0.0]
    @test tm.positions[4:6]           == [1.0, 0.0, 0.0]
    # 1-based PlainMesh connections become 0-based Int32 indices.
    @test tm.indices                  == Int32[0, 1, 2]
    @test tm.vertex_colors            == ["#ff0000", "#00ff00", "#0000ff"]
end

@testitem "BackboneConfig validation" begin
    using BiochemicalVisualization: BackboneConfig, BACKBONE_COLOR_METHODS,
                                    prepare_backbone_model

    # Defaults construct cleanly.
    cfg = BackboneConfig{Float32}()
    @test cfg.tube_radius      ≈ 0.2f0
    @test cfg.resolution_along ≈ 1.5f0
    @test cfg.resolution_cross == 12
    @test cfg.backbone_type    === :backbone
    @test :secondary_structure in BACKBONE_COLOR_METHODS

    # Invalid kwargs raise ArgumentError. We pass through the user-
    # facing entry point so the error surfaces from the same code path
    # consumers will hit.
    using BiochemicalAlgorithms
    sys = System{Float32}()
    @test_throws ArgumentError prepare_backbone_model(sys; tube_radius = -1.0)
    @test_throws ArgumentError prepare_backbone_model(sys; resolution_along = 0.5)
    @test_throws ArgumentError prepare_backbone_model(sys; resolution_cross = 2)
    @test_throws ArgumentError prepare_backbone_model(sys; color = :element)   # not a backbone color
    @test_throws ArgumentError prepare_backbone_model(sys; backbone_type = :nope)
    @test_throws ArgumentError prepare_backbone_model(sys;
        control_point_strategy = :c_alpha, frame = :second_spline)
end
