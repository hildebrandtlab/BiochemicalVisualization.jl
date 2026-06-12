export
    ball_and_stick,
    ball_and_stick!,
    sas,
    sas!,
    Scene,
    ses,
    ses!,
    set_active!,
    set_visible!,
    stick,
    stick!,
    van_der_waals,
    van_der_waals!

const _VISUALIZE_BUNDLE = asset_path("../typescript/dist/biochemicalvisualization.js")
# Tell Julia's precompiler that this module depends on the bundle file.
# Without this, rebuilding the bundle (`npm run build`) does NOT
# invalidate BCV's precompile cache and Bonito keeps serving stale JS.
include_dependency(_VISUALIZE_BUNDLE)
const VISUALIZE = ES6Module(_VISUALIZE_BUNDLE)::Asset

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
        density=_density_value("high"),
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

# Centroid across ALL representations in a scene. Atom models supply
# primitives (sphere/cylinder centers); surface models supply only `mesh`.
# Returns `nothing` only for a fully empty scene.
function _focus_point(scene::Scene)
    accumulated = Float64[0, 0, 0]
    n_total = 0
    for dr in scene.representations
        r = dr.repr
        for prim in vcat(values(r.primitives)...)
            c = _center(prim)
            accumulated[1] += c[1]
            accumulated[2] += c[2]
            accumulated[3] += c[3]
            n_total += 1
        end
        if !isnothing(r.mesh)
            m = r.mesh
            n_verts = length(m.positions) ÷ 3
            @inbounds for i in 1:n_verts
                accumulated[1] += m.positions[3i - 2]
                accumulated[2] += m.positions[3i - 1]
                accumulated[3] += m.positions[3i]
            end
            n_total += n_verts
        end
    end
    n_total == 0 && return nothing
    return accumulated ./ n_total
end

# Resolves the kwargs surface params for one rep build.
_build_repr(dr::DisplayedRepresentation) = prepare_model(dr.source;
    type=dr.type,
    probe_radius=dr.probe_radius,
    density=_density_value(dr.density),
    coloring=dr.coloring,
    solid_color=dr.solid_color)

# Pack one rep for the wire — keep field order in sync with rendering.ts.
_serialize_rep(dr::DisplayedRepresentation) = Dict(
    "repr"     => dr.repr,
    "type"     => dr.type,
    "coloring" => dr.coloring,
    "density"  => dr.density,
    "visible"  => dr.visible,
)
_serialize_scene(scene::Scene) = Dict(
    "representations" => [_serialize_rep(dr) for dr in scene.representations],
    "active"          => scene.active,
)

# Build the Bonito App that renders `scene`. Called from Base.show below.
function _build_scene_app(scene::Scene)
    isempty(scene.representations) &&
        throw(ArgumentError("cannot render an empty Scene; add a representation first (e.g. stick!(scene, sys))"))

    fp = _focus_point(scene)
    isnothing(fp) && throw(ArgumentError("scene has no displayable geometry"))
    focus_point = fp

    style_str = scene.style
    width     = scene.width
    height    = scene.height
    dom = DOM.div(;style="width: $width; height: $height;")

    # JS↔Julia channels. Each request payload may include a `rep`
    # index (1-based); when absent, requests resolve to `scene.active`.
    # The top menu bar dispatches without `rep` (drives the active
    # rep); the sidebar dispatches with an explicit `rep` for per-row
    # actions.
    model_request      = Observable{Any}(nothing)
    coloring_request   = Observable{Any}(nothing)
    density_request    = Observable{Any}(nothing)
    visibility_request = Observable{Any}(nothing)
    delete_request     = Observable{Any}(nothing)
    active_request     = Observable{Any}(nothing)
    scene_obs          = Observable{Any}(_serialize_scene(scene))

    # Resolve the rep index from a Dict payload. Falls back to
    # scene.active. Returns 0 if invalid (no rep at that index).
    function _resolve_rep_idx(payload)
        n = length(scene.representations)
        n == 0 && return 0
        i = if payload isa AbstractDict && haskey(payload, "rep")
            try Int(payload["rep"]) catch; 0 end
        else
            scene.active
        end
        (1 ≤ i ≤ n) ? i : 0
    end

    function rebuild_rep!(i::Int)
        (i == 0 || i > length(scene.representations)) && return
        dr = scene.representations[i]
        new_r = _build_repr(dr)
        isnothing(new_r) && return
        dr.repr = new_r
        scene_obs[] = _serialize_scene(scene)
    end

    on(model_request) do payload
        payload isa AbstractDict || return
        requested = String(get(payload, "type", ""))
        requested in VALID_MODEL_TYPES || return
        i = _resolve_rep_idx(payload)
        i == 0 && return
        scene.representations[i].type = requested
        rebuild_rep!(i)
    end

    on(coloring_request) do payload
        payload isa AbstractDict || return
        requested = String(get(payload, "coloring", ""))
        requested in SURFACE_COLOR_METHODS || return
        i = _resolve_rep_idx(payload)
        i == 0 && return
        scene.representations[i].coloring = requested
        rebuild_rep!(i)
    end

    on(density_request) do payload
        payload isa AbstractDict || return
        requested = String(get(payload, "density", ""))
        requested in DENSITY_LEVELS || return
        i = _resolve_rep_idx(payload)
        i == 0 && return
        dr = scene.representations[i]
        dr.density = requested
        # Density is a no-op for atom models; still record the setting
        # but don't re-triangulate.
        dr.type in ("SAS", "SES") && rebuild_rep!(i)
    end

    on(visibility_request) do payload
        payload isa AbstractDict || return
        i = _resolve_rep_idx(payload)
        i == 0 && return
        scene.representations[i].visible = Bool(get(payload, "visible", true))
        scene_obs[] = _serialize_scene(scene)
    end

    on(delete_request) do payload
        payload isa AbstractDict || return
        i = _resolve_rep_idx(payload)
        i == 0 && return
        Base.delete!(scene, i)
        # Empty scenes can't be serialized for rendering; the JS side
        # simply leaves the previous frame standing. A more graceful
        # path is to clear the canvas, which the JS update() does
        # because it now handles a length-0 list.
        scene_obs[] = _serialize_scene(scene)
    end

    on(active_request) do payload
        payload isa AbstractDict || return
        i = _resolve_rep_idx(payload)
        i == 0 && return
        scene.active = i
        scene_obs[] = _serialize_scene(scene)
    end

    initial_state = _serialize_scene(scene)

    # Each plot needs its own DOM id so multi-plot notebooks don't
    # collide.
    scene_id     = _next_scene_id()
    scene_div_id = scene_id * "-div"

    App() do session::Session
        _maybe_dedup_visualize_asset!(session)
        Bonito.onload(session, dom, js"""
            function (container){
                $(VISUALIZE).then(VISUALIZE => {
                    parent = $dom.parentNode;
                    parent.style.height = '100vh';

                    const sceneEl = document.createElement("bv-scene");
                    sceneEl.setAttribute("id", $scene_id);
                    sceneEl.setAttribute("width", $width);
                    sceneEl.setAttribute("height", $height);

                    const modelReq      = $(model_request);
                    const coloringReq   = $(coloring_request);
                    const densityReq    = $(density_request);
                    const visibilityReq = $(visibility_request);
                    const deleteReq     = $(delete_request);
                    const activeReq     = $(active_request);
                    const sceneObs      = $(scene_obs);

                    sceneEl.addEventListener('bv-scene-mounted', () => {
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
                        forwardToScene("add-representation", $initial_state, scene_div);
                        forwardToScene("set-render-mode", { ssao_mode: 2, debug: false, style: $style_str }, scene_div);

                        // Forward the entire detail dict so the
                        // sidebar can include an explicit `rep` index;
                        // the menu bar dispatches without one (Julia
                        // falls back to scene.active).
                        scene_div.addEventListener("bv-request-model",      (e) => modelReq.notify(e.detail));
                        scene_div.addEventListener("bv-request-coloring",   (e) => coloringReq.notify(e.detail));
                        scene_div.addEventListener("bv-request-density",    (e) => densityReq.notify(e.detail));
                        scene_div.addEventListener("bv-request-visibility", (e) => visibilityReq.notify(e.detail));
                        scene_div.addEventListener("bv-request-delete",     (e) => deleteReq.notify(e.detail));
                        scene_div.addEventListener("bv-request-active",     (e) => activeReq.notify(e.detail));

                        // Julia → JS: rebuilt scene state arrived
                        sceneObs.on((newState) => {
                            forwardToScene("add-representation", newState, scene_div);
                        });
                    });

                    $dom.appendChild(sceneEl);
                })
            }
        """)

        Bonito.record_states(session, dom)
    end
end

# Base.show hooks so a Scene returned from a notebook cell renders the
# same way an App() does. Bonito's own App show method already handles
# all the relevant MIMEs, so we just construct the App and delegate.
#
# We deliberately enumerate the MIMEs we support — defining a generic
# `show(::IO, ::MIME, ::Scene)` would force a fallback path for every
# other MIME the display stack probes (text/plain, image/svg+xml, etc.),
# and the `invoke(...)` route into Base.show with signature
# (::IO, ::MIME, ::Any) is itself ambiguous across many packages'
# specialized methods. Per-MIME definitions keep dispatch unambiguous.
for _mime in (MIME"text/html",
              MIME"application/prs.juno.plotpane+html",
              MIME"juliavscode/html",
              MIME"application/vnd.Bonito.application+html")
    @eval Base.showable(::$_mime, ::Scene) = true
    @eval Base.show(io::IO, mime::$_mime, scene::Scene) =
        show(io, mime, _build_scene_app(scene))
end

# -----------------------------------------------------------------------------
# Legacy single-rep entry point. Kept for backwards compat — implemented
# in terms of the Scene API.
# -----------------------------------------------------------------------------
function display_model(
    ac::AbstractAtomContainer;
    type="BALL_AND_STICK",
    style="default",
    probe_radius=1.5,
    # Default matches BALL's DRAWING_PRECISION_HIGH (=2) → 6.5, i.e.
    # what BALLView shows for a freshly added surface representation.
    density=_density_value("high"),
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

    density_level_str = _density_level(density)
    density_value     = _density_value(density_level_str)

    initial_r = prepare_model(ac;
        type=type_str, probe_radius, density=density_value, coloring, solid_color)
    isnothing(initial_r) && return

    scene = Scene(style=style_str, width=width, height=height)
    push!(scene.representations, DisplayedRepresentation(
        initial_r, ac, type_str, String(coloring), density_level_str,
        probe_radius, solid_color, true,
    ))
    scene.active = 1
    return scene
end

# -----------------------------------------------------------------------------
# Scene-mutating display API (the modern entry points). The single-call
# convenience functions below build a fresh `Scene` and delegate.
# -----------------------------------------------------------------------------

# Shared back-end for the *! mutators. Validates kwargs, builds the
# representation, wraps it in a DisplayedRepresentation, appends to the
# scene, and makes it the active rep.
function _push_model!(scene::Scene, ac::AbstractAtomContainer, type::AbstractString;
        probe_radius=1.5,
        density=_density_value("high"),
        coloring::AbstractString="element",
        solid_color::AbstractString="#cccccc")
    type_str = String(type)
    type_str in VALID_MODEL_TYPES ||
        throw(ArgumentError("type must be one of $(VALID_MODEL_TYPES), got: $type"))
    coloring in SURFACE_COLOR_METHODS ||
        throw(ArgumentError("coloring must be one of $(SURFACE_COLOR_METHODS), got: $coloring"))

    density_level = _density_level(density)
    density_value = _density_value(density_level)
    repr = prepare_model(ac;
        type=type_str, probe_radius, density=density_value, coloring, solid_color)
    isnothing(repr) && return scene

    dr = DisplayedRepresentation(
        repr, ac, type_str, String(coloring), density_level,
        probe_radius, String(solid_color), true,
    )
    _push_representation!(scene, dr)
    return scene
end

# Internal: build a one-rep scene at the right style/sizing using the
# kwargs the legacy convenience functions accept.
function _scene_with(ac, type;
        style="default", width="80%", height="60%", kwargs...)
    style_str = String(string(style))
    style_str in VALID_RENDER_STYLES ||
        throw(ArgumentError("style must be one of $(VALID_RENDER_STYLES), got: $style"))
    scene = Scene(style=style_str, width=String(string(width)), height=String(string(height)))
    return _push_model!(scene, ac, type; kwargs...)
end

"""
    ball_and_stick(ac; style=:default, kwargs...) -> Scene
    ball_and_stick!(scene, ac; kwargs...) -> Scene

Build a ball-and-stick representation. The non-mutating form creates a
fresh `Scene` and returns it (so the REPL / notebook display machinery
renders it). The `!` form appends to an existing scene and returns it,
enabling composition:

    scene = Scene()
    ball_and_stick!(scene, sys)
    sas!(scene, sys; coloring = "chain")
    scene

Pass `style=:qutemol` for a render approximating the look of QuteMol.
The same style can be toggled at runtime from the menu bar.
"""
ball_and_stick(ac; kwargs...)              = _scene_with(ac, "BALL_AND_STICK"; kwargs...)
ball_and_stick!(scene::Scene, ac; kwargs...) = _push_model!(scene, ac, "BALL_AND_STICK"; kwargs...)

"""
    stick(ac; style=:default, kwargs...) -> Scene
    stick!(scene, ac; kwargs...) -> Scene

Stick representation. See [`ball_and_stick`](@ref) for the kwarg semantics.
"""
stick(ac; kwargs...)              = _scene_with(ac, "STICK"; kwargs...)
stick!(scene::Scene, ac; kwargs...) = _push_model!(scene, ac, "STICK"; kwargs...)

"""
    van_der_waals(ac; sphere_radius=nothing, style=:default, kwargs...) -> Scene
    van_der_waals!(scene, ac; sphere_radius=nothing, kwargs...) -> Scene

Van-der-Waals (space-filling) representation. By default sphere radii are
looked up per element from a Bondi/Mantina table; pass `sphere_radius`
(a `Real`) to render every atom with the same constant radius instead.
See [`ball_and_stick`](@ref) for `style`.
"""
van_der_waals(ac; kwargs...)              = _scene_with(ac, "VAN_DER_WAALS"; kwargs...)
van_der_waals!(scene::Scene, ac; kwargs...) = _push_model!(scene, ac, "VAN_DER_WAALS"; kwargs...)

"""
    sas(ac; probe_radius=1.5, density="medium",
        coloring="element", solid_color="#cccccc", style=:default, kwargs...) -> Scene
    sas!(scene, ac; kwargs...) -> Scene

Triangulated solvent-accessible surface. The mesh is computed by
BiochemicalAlgorithms via `triangulate_sas`; vertex colors are picked by
the `coloring` method (`"element"`, `"chain"`, `"residue"`,
`"residue_index"`, `"solid"`) — see [`SURFACE_COLOR_METHODS`](@ref).
`probe_radius` is the solvent probe size in Å; `density` controls the
icosphere sampling resolution (matches BALL presets `"low"` / `"medium"` /
`"high"` / `"ultra"` or accepts an arbitrary numeric multiplier).
`solid_color` is only consulted when `coloring="solid"`.
"""
sas(ac; kwargs...)              = _scene_with(ac, "SAS"; kwargs...)
sas!(scene::Scene, ac; kwargs...) = _push_model!(scene, ac, "SAS"; kwargs...)

"""
    ses(ac; probe_radius=1.5, density="medium",
        coloring="element", solid_color="#cccccc", style=:default, kwargs...) -> Scene
    ses!(scene, ac; kwargs...) -> Scene

Triangulated solvent-excluded surface. See [`sas`](@ref) for the
coloring / density / probe_radius semantics.
"""
ses(ac; kwargs...)              = _scene_with(ac, "SES"; kwargs...)
ses!(scene::Scene, ac; kwargs...) = _push_model!(scene, ac, "SES"; kwargs...)
