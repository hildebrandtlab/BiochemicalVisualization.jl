@testitem "model builders" begin
    using BiochemicalAlgorithms
    using GeometryBasics
    using MsgPack

    # Build a tiny diatomic system: C-O with a single bond.
    function _make_diatomic(T)
        sys = System{T}()
        mol = Molecule(sys)
        chain = Chain(mol; name = "A")
        frag = Fragment(chain, 1)
        a1 = Atom(frag, 1, Elements.C; name = "C", r = zero(Vector3{T}))
        a2 = Atom(frag, 2, Elements.O; name = "O", r = ones(Vector3{T}))
        # Atom-based constructor — the (sys, idx, idx, order) variant was
        # dropped from BCA after v0.7.3; this one exists in all versions.
        Bond(a1, a2, BondOrder.Single)
        sys
    end

    for T in (Float32, Float64)
        sys = _make_diatomic(T)

        @testset "ball_and_stick (T=$T)" begin
            r = BiochemicalVisualization.prepare_ball_and_stick_model(sys)
            @test length(r.primitives["spheres"])   == 2
            # one bond is split at the midpoint into two cylinders.
            @test length(r.primitives["cylinders"]) == 2
            @test length(r.colors["sphere_colors"]) == 2
            @test length(r.colors["cylinder_colors"]) == 2
            @test length(r.meta_data) == 2
            @test all(c -> startswith(c, "#"), r.colors["sphere_colors"])
        end

        @testset "stick (T=$T)" begin
            r = BiochemicalVisualization.prepare_stick_model(sys)
            # stick = ball-and-stick with sphere_radius == stick_radius
            @test length(r.primitives["spheres"]) == 2
            @test length(r.primitives["cylinders"]) == 2
        end

        @testset "van_der_waals (T=$T)" begin
            r = BiochemicalVisualization.prepare_van_der_waals_model(sys)
            @test length(r.primitives["spheres"]) == 2
            @test !haskey(r.primitives, "cylinders")
            # Bondi VdW radii: C = 1.70 Å, O = 1.52 Å — neither is the bogus 1.0 fallback.
            radii = [s.r for s in r.primitives["spheres"]]
            @test radii[1] ≈ T(1.70)
            @test radii[2] ≈ T(1.52)
        end

        @testset "van_der_waals constant sphere_radius (T=$T)" begin
            r = BiochemicalVisualization.prepare_van_der_waals_model(sys; sphere_radius=1.8)
            radii = [s.r for s in r.primitives["spheres"]]
            @test all(==(T(1.8)), radii)
            @test eltype(radii) == T
        end

        @testset "MsgPack round-trip (T=$T)" begin
            r = BiochemicalVisualization.prepare_ball_and_stick_model(sys)
            bytes = pack(r)
            @test bytes isa Vector{UInt8}
            @test length(bytes) > 0
        end
    end
end

@testitem "element_color" begin
    using BiochemicalAlgorithms
    # Hydrogen (atomic number 1) is white.
    @test BiochemicalVisualization.element_color(Elements.H) == "#ffffff"
    # Carbon (atomic number 6) is grey (144,144,144).
    @test BiochemicalVisualization.element_color(Elements.C) == "#909090"
    # Out-of-range index returns the UNKNOWN entry (white) and warns once.
    @test BiochemicalVisualization.element_color(999) == "#ffffff"
end

@testitem "element_vdw_radius" begin
    using BiochemicalAlgorithms
    @test BiochemicalVisualization.element_vdw_radius(Elements.H) ≈ 1.20
    @test BiochemicalVisualization.element_vdw_radius(Elements.C) ≈ 1.70
    @test BiochemicalVisualization.element_vdw_radius(Elements.O) ≈ 1.52
    # Out-of-range index falls back to the trailing entry.
    @test BiochemicalVisualization.element_vdw_radius(999) ≈ 2.00
end

@testitem "empty system display_model returns nothing" begin
    using BiochemicalAlgorithms
    sys = System{Float32}()
    # No atoms, no bonds → prepare_ball_and_stick_model produces a Representation
    # whose primitives are empty; display_model must return early without throwing.
    @test BiochemicalVisualization.display_model(sys) === nothing
end
