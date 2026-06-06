export
    ball_and_stick,
    sas,
    ses,
    stick,
    van_der_waals

const VISUALIZE = ES6Module(asset_path("../typescript/dist/biochemicalvisualization.js"))::Asset

const _hex_colors = [hex(RGB((e ./ 255)...)) for e in ELEMENT_COLORS]

function element_color(e)
    i = Int(e)
    if i < 1 || i > length(_hex_colors)
        @warn "element_color: unknown element index $i; defaulting to white" maxlog=1
        return "#"*lowercase(_hex_colors[end])
    end
    "#"*lowercase(_hex_colors[i])
end

function prepare_model(ac::AbstractAtomContainer;
        type="BALL_AND_STICK",
        probe_radius=1.5,
        density=1.0,
        coloring::AbstractString="element",
        solid_color::AbstractString="#cccccc")
    if type == "BALL_AND_STICK"
        return prepare_ball_and_stick_model(ac)
    elseif type == "STICK"
        return prepare_stick_model(ac)
    elseif type == "VAN_DER_WAALS"
        return prepare_van_der_waals_model(ac)
    elseif type == "SAS"
        return prepare_sas_model(ac; probe_radius, density, coloring, solid_color)
    elseif type == "SES"
        return prepare_ses_model(ac; probe_radius, density, coloring, solid_color)
    end

    return nothing
end

const VALID_RENDER_STYLES = ("default", "qutemol")
const VALID_MODEL_TYPES   = ("BALL_AND_STICK", "STICK", "VAN_DER_WAALS", "SAS", "SES")

# Discrete density levels exposed via the JS Density menu button.
# `density` keyword still accepts an arbitrary `Real` for power users;
# numeric values get snapped to the nearest level so the menu label
# stays consistent with what's actually being rendered.
const DENSITY_LEVELS = ("low", "medium", "high", "ultra")
# Values copied from BALL's VIEW/KERNEL/common.C SurfaceDrawingPrecisions[4],
# so a density label in this package corresponds to the same triangulation
# density a BALLView user would expect from the matching preset.
const _DENSITY_VALUES = (
    "low"    => 1.5,
    "medium" => 3.5,
    "high"   => 6.5,
    "ultra"  => 12.0,
)
_density_value(name::AbstractString) =
    something(findfirst(p -> p[1] == name, _DENSITY_VALUES), 0) |> i ->
        i == 0 ? error("unknown density level: $name") : _DENSITY_VALUES[i][2]

# Nearest level for an arbitrary numeric density, used to pick the
# initial menu label when the user passed `density=2.5` (or similar).
_density_level(d::Real) = _DENSITY_VALUES[argmin([abs(v - d) for (_, v) in _DENSITY_VALUES])][1]
_density_level(d::AbstractString) = (d in DENSITY_LEVELS) ? String(d) :
    error("density must be a Real or one of $(DENSITY_LEVELS), got: $d")

# Monotonically increasing per-process counter. Each call to
# `display_model` gets its own scene id so that multiple plots in the
# same notebook (Jupyter / Quarto / VSCode plot pane) don't share a DOM
# id — otherwise getElementById picks the first match and only that
# plot ever receives `add-representation` events.
const _SCENE_COUNTER = Ref(0)
_next_scene_id() = (_SCENE_COUNTER[] += 1; "bv-scene-$(_SCENE_COUNTER[])")

# Bundle dedup across notebook cells. Bonito's `push_dependencies!`
# emits per-subsession assets via `setdiff(sub.imports, root.imports)`,
# so adding our bundle to the root session's imports causes every
# subsequent subsession to skip re-embedding it. The browser registers
# `BONITO_IMPORTS[hash] = import('data:...')` from the first cell that
# does emit the bundle; later cells' JS still references the same
# `BONITO_IMPORTS[hash]` and gets the cached promise.
#
# We must NOT push on the very first display in a fresh root session —
# otherwise the setdiff strips the bundle from cell 1 too and no cell
# ever emits it. We track the root session we last saw; if it matches,
# we've already emitted once and can safely dedup.
const _LAST_ROOT = Ref{Union{Nothing, Bonito.Session}}(nothing)

function _maybe_dedup_visualize_asset!(session)
    isnothing(session.parent) && return
    root = Bonito.root_session(session)
    if _LAST_ROOT[] !== root
        # First display in this root session — let the bundle emit normally.
        _LAST_ROOT[] = root
        return
    end
    push!(root.imports, VISUALIZE)
    return
end

# Centroid of the active representation, used as the camera focus.
# Atom models supply primitives (sphere/cylinder centers); surface
# models supply only `mesh`. Returns `nothing` for an empty
# representation.
function _focus_point(r::Representation)
    primitives = vcat(values(r.primitives)...)
    if !isempty(primitives)
        return mean(_center.(primitives))
    end
    if !isnothing(r.mesh)
        m = r.mesh
        n = length(m.positions) ÷ 3
        n == 0 && return nothing
        sx = sy = sz = zero(eltype(m.positions))
        @inbounds for i in 1:n
            sx += m.positions[3i - 2]
            sy += m.positions[3i - 1]
            sz += m.positions[3i]
        end
        return [sx / n, sy / n, sz / n]
    end
    nothing
end

function display_model(
    ac::AbstractAtomContainer;
    type="BALL_AND_STICK",
    style="default",
    probe_radius=1.5,
    density=1.0,
    coloring::AbstractString="element",
    solid_color::AbstractString="#cccccc",
    width="80%",
    height="60%"
)
    style_str = string(style)
    if !(style_str in VALID_RENDER_STYLES)
        throw(ArgumentError("style must be one of $(VALID_RENDER_STYLES), got: $(style)"))
    end

    type_str = string(type)
    if !(type_str in VALID_MODEL_TYPES)
        throw(ArgumentError("type must be one of $(VALID_MODEL_TYPES), got: $(type)"))
    end

    if !(coloring in SURFACE_COLOR_METHODS)
        throw(ArgumentError("coloring must be one of $(SURFACE_COLOR_METHODS), got: $(coloring)"))
    end

    # Resolve the user-supplied `density` to (level name, numeric value).
    # The menu cycle works in level names; the triangulator wants a number.
    density_level_str = _density_level(density)
    density_value     = _density_value(density_level_str)

    dom = DOM.div(;style="width: $width; height: $height;")

    # Build only the initially-active representation. The others are
    # recomputed on demand when the user switches via the menu. This keeps
    # initial latency and wire size proportional to the molecule size, not
    # to the number of model variants — the right choice for large systems.
    initial_r = prepare_model(ac;
        type=type_str, probe_radius, density=density_value, coloring, solid_color)
    if isnothing(initial_r)
        return
    end

    fp = _focus_point(initial_r)
    if isnothing(fp)
        return
    end
    focus_point = fp

    # JS↔Julia channels driving the menu-bar buttons:
    #   model_request    : Model cycle button -> rebuild with new `type`
    #   coloring_request : Color cycle button -> rebuild with new `coloring`
    #   density_request  : Density cycle button -> rebuild with new `density`
    #   repr_obs         : Julia pushes back; JS dispatches add-representation
    # All three requests funnel through `repr_obs` so the JS side has a
    # single update path.
    active_type      = Ref(type_str)
    active_coloring  = Ref(coloring)
    active_density   = Ref(density_level_str)
    model_request    = Observable(type_str)
    coloring_request = Observable(coloring)
    density_request  = Observable(density_level_str)
    repr_obs         = Observable{Any}(initial_r)

    rebuild() = begin
        new_r = prepare_model(ac;
            type=active_type[], probe_radius,
            density=_density_value(active_density[]),
            coloring=active_coloring[], solid_color)
        isnothing(new_r) || (repr_obs[] = new_r)
    end

    on(model_request) do requested
        requested in VALID_MODEL_TYPES || return
        active_type[] = requested
        rebuild()
    end

    on(coloring_request) do requested
        requested in SURFACE_COLOR_METHODS || return
        active_coloring[] = requested
        rebuild()
    end

    on(density_request) do requested
        requested in DENSITY_LEVELS || return
        active_density[] = requested
        # No rebuild for atom models — density is a no-op for them but a
        # rebuild churns the cylinder/sphere instances for nothing.
        if active_type[] in ("SAS", "SES")
            rebuild()
        end
    end

    # Each plot needs its own DOM id so multi-plot notebooks don't
    # collide. The id flows into both the <bv-scene> element and the
    # React-mounted scene_div ($scene_id + "-div") on the JS side.
    scene_id     = _next_scene_id()
    scene_div_id = scene_id * "-div"

    App() do session::Session
        _maybe_dedup_visualize_asset!(session)
        Bonito.onload(session, dom, js"""
            function (container){
                $(VISUALIZE).then(VISUALIZE => {
                    parent = $dom.parentNode;
                    parent.style.height = '100vh';

                    const scene = document.createElement("bv-scene");
                    scene.setAttribute("id", $scene_id);
                    scene.setAttribute("width", $width);
                    scene.setAttribute("height", $height);

                    const modelReq    = $(model_request);
                    const coloringReq = $(coloring_request);
                    const densityReq  = $(density_request);
                    const reprObs     = $(repr_obs);

                    // Listen on `scene` itself (not document) so each
                    // plot's mount only triggers its own setup. The
                    // bv-scene-mounted event is composed:true so it
                    // passes through the host element on its way up.
                    scene.addEventListener('bv-scene-mounted', () => {
                        function forwardToScene(eventName, data, component) {
                            if (component) {
                                const event = new CustomEvent(eventName, { detail: data });
                                component.dispatchEvent(event);
                            } else {
                                console.warn("React Web Component not found!");
                            }
                        }

                        const scene_div = document.getElementById($scene_div_id);

                        forwardToScene("set-focus", { focus_point: $focus_point }, scene_div);
                        forwardToScene("add-representation",
                            { representation: $initial_r, active: $type_str,
                              coloring: $coloring, density: $density_level_str },
                            scene_div);
                        forwardToScene("set-render-mode", { ssao_mode: 2, debug: false, style: $style_str }, scene_div);

                        // JS → Julia request events dispatch on the local
                        // scene_div (see SceneComponent.tsx), so listen
                        // there too — listening on `document` would let
                        // one plot's menu drive every plot in the page.
                        scene_div.addEventListener("bv-request-model", (e) => {
                            modelReq.notify(e.detail.type);
                        });
                        scene_div.addEventListener("bv-request-coloring", (e) => {
                            coloringReq.notify(e.detail.coloring);
                        });
                        scene_div.addEventListener("bv-request-density", (e) => {
                            densityReq.notify(e.detail.density);
                        });

                        // Julia → JS: rebuilt representation arrived
                        reprObs.on((newRepr) => {
                            forwardToScene("add-representation", { representation: newRepr }, scene_div);
                        });
                    });

                    $dom.appendChild(scene);
                })
            }
        """)

        Bonito.record_states(session, dom)
    end
end

"""
    ball_and_stick(::AbstractAtomContainer; style=:default, kwargs...)

Creates and displays a ball-and-stick representation for the given atom container.
Pass `style=:qutemol` for a render approximating the look of QuteMol (white
background, glossy spheres, atom halos, SSAO on). The same style can be toggled
at runtime from the menu bar in the rendered scene.
"""
ball_and_stick(ac; kwargs...) = display_model(ac; type="BALL_AND_STICK", kwargs...)

"""
    stick(::AbstractAtomContainer; style=:default, kwargs...)

Creates and displays a stick representation for the given atom container.
See [`ball_and_stick`](@ref) for the `style` keyword.
"""
stick(ac; kwargs...)          = display_model(ac; type="STICK", kwargs...)

"""
    van_der_waals(::AbstractAtomContainer; sphere_radius=nothing, style=:default, kwargs...)

Creates and displays a van-der-Waals representation for the given atom container.
By default, sphere radii are looked up per element from a Bondi/Mantina table of
van der Waals radii. Pass `sphere_radius` (a `Real`) to render every atom with the
same constant radius instead — useful for space-filling renders that emphasize
shape over chemistry. See [`ball_and_stick`](@ref) for the `style` keyword.
"""
van_der_waals(ac; kwargs...)  = display_model(ac; type="VAN_DER_WAALS", kwargs...)

"""
    sas(::AbstractAtomContainer; probe_radius=1.5, density=1.0,
        coloring="element", solid_color="#cccccc", style=:default, kwargs...)

Creates and displays a triangulated **solvent-accessible surface** for the
given atom container. The mesh is computed by BiochemicalAlgorithms via
`triangulate_sas`; vertex colors are picked by the `coloring` method (one
of "element", "chain", "residue", "residue_index", "solid") — see
[`SURFACE_COLOR_METHODS`](@ref). `probe_radius` is the solvent probe size
in Å; `density` controls the icosphere sampling resolution (>1 = denser
mesh). `solid_color` is only consulted when `coloring="solid"`.
"""
sas(ac; kwargs...)            = display_model(ac; type="SAS", kwargs...)

"""
    ses(::AbstractAtomContainer; probe_radius=1.5, density=1.0,
        coloring="element", solid_color="#cccccc", style=:default, kwargs...)

Creates and displays a triangulated **solvent-excluded surface** for the
given atom container. See [`sas`](@ref) for the coloring / density /
probe_radius keywords.
"""
ses(ac; kwargs...)            = display_model(ac; type="SES", kwargs...)
