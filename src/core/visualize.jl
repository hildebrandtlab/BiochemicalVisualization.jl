export
    backbone,
    backbone!,
    ball_and_stick,
    ball_and_stick!,
    cartoon,
    cartoon!,
    ribbon,
    ribbon!,
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
# Local module asset (carries the bundle bytes + content hash). Under a
# normal Bonito asset server (REPL / standalone) this is served by URL
# directly. Under IJulia, Bonito defaults to `NoServer`, which would
# base64-inline this ~7 MB bundle into the FIRST scene cell (~12.5 MB of
# notebook output → browser stalls). See `_visualize()` for how we avoid
# that by serving just this bundle from a stable HTTP route while letting
# NoServer inline the small connection-critical assets (which is what
# keeps the interactive WebSocket working — see the note in __init__).
const VISUALIZE_LOCAL = ES6Module(_VISUALIZE_BUNDLE)::Asset

# Lazily-built, kept-alive HTTPAssetServer route that serves the bundle
# by URL even while sessions use NoServer, plus the dynamic-import JS
# expression pointing at it. Both are created on first use (when the
# Bonito server and its proxy URL are known) and never torn down, so the
# bundle URL stays valid for the kernel's lifetime.
const _BUNDLE_ASSET_SERVER = Ref{Any}(nothing)
const _VISUALIZE_ONLINE    = Ref{Any}(nothing)

# True when we're rendering for offline/static export (Page(offline=true)
# forces the NoConnection type). There, the bundle MUST be inlined so the
# exported HTML is self-contained — don't externalize.
_is_offline_export() = Bonito.FORCED_CONNECTION[] === Bonito.NoConnection

"""
    _visualize() -> Union{Asset, Bonito.JSCode}

What to interpolate into a scene's JS for the bundle module promise.
Externalizes the bundle to a stable HTTP URL ONLY when it would otherwise
be inlined by NoServer (i.e. under IJulia, interactive) — that path
returns a raw `import('<url>')` JSCode expression. For the REPL/
standalone path Bonito already serves the local asset by URL, and for
offline export we want it inlined — both return the local `Asset`.
"""
function _visualize()
    (isdefined(Main, :IJulia) && !_is_offline_export()) || return VISUALIZE_LOCAL
    if isnothing(_VISUALIZE_ONLINE[])
        # Register a permanent HTTPAssetServer route on the (already
        # running, used for the WebSocket) global server. `url(...)`
        # registers the bundle and returns a proxy-aware URL: absolute
        # `http://localhost:<port>/assets/...` in direct mode, but
        # PAGE-RELATIVE `/proxy/<port>/assets/...` when BCV_JUPYTER_PROXY
        # is set (the browser resolves it against the JupyterLab origin —
        # that's what makes remote/phone access work). We keep the
        # ChildAssetServer in a module Ref so its refcount keeps the
        # bundle registered.
        server = Bonito.HTTPAssetServer()
        bundle_url = Bonito.url(server, VISUALIZE_LOCAL)
        _BUNDLE_ASSET_SERVER[] = server
        # Hand back a raw dynamic-import EXPRESSION, not an Asset.
        # `ES6Module(bundle_url)` breaks in proxy mode: the page-relative
        # URL fails Bonito's `is_online` check (only http/https/ftp/`//`
        # prefixes count), gets treated as a local file path, and the
        # es6module Asset constructor then tries — and fails — to
        # deno-bundle it ("Failed to bundle /proxy/... bundle_dir:
        # nothing"). Even in direct mode that round-trip made deno fetch
        # and re-bundle the already-bundled file from our own server.
        #
        # The specifier must be absolutized IN THE BROWSER: under
        # NoServer this import() executes inside modules loaded from
        # data: URLs, which have no base URL, so even a root-relative
        # "/proxy/<port>/assets/..." fails with "Failed to resolve
        # module specifier". `new URL(path, window.location.href)`
        # resolves it against the page the user actually loaded (any
        # host: localhost, LAN IP, tunnel) and is a no-op for already-
        # absolute URLs. The browser module cache dedups repeat imports
        # of the same resolved URL across cells.
        _VISUALIZE_ONLINE[] =
            js"import(new URL($(bundle_url), window.location.href).href)"
    end
    return _VISUALIZE_ONLINE[]
end

const _hex_colors = [hex(RGB((e ./ 255)...)) for e in ELEMENT_COLORS]

function element_color(e)
    i = Int(e)
    if i < 1 || i > length(_hex_colors)
        @warn "element_color: unknown element index $i; defaulting to white" maxlog=1
        return "#"*lowercase(_hex_colors[end])
    end
    "#"*lowercase(_hex_colors[i])
end

# A Representation is empty when none of its primitive collections
# carry anything and no surface mesh was attached. Used by
# `display_model` to silently skip empty inputs (matches the old
# pre-Scene contract).
function _is_empty_representation(r::Representation)
    isnothing(r.mesh) || return false
    for v in values(r.primitives)
        isempty(v) || return false
    end
    return true
end

function prepare_model(ac::AbstractAtomContainer;
        type="BALL_AND_STICK",
        probe_radius=1.5,
        density=_density_value("high"),
        coloring::AbstractString="element",
        solid_color::AbstractString="#cccccc",
        backbone_kwargs::NamedTuple=NamedTuple())
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
    elseif type == "BACKBONE"
        return prepare_backbone_model(ac; backbone_kwargs...)
    elseif type == "RIBBON"
        return prepare_ribbon_model(ac; backbone_kwargs...)
    elseif type == "CARTOON"
        return prepare_cartoon_model(ac; backbone_kwargs...)
    end

    return nothing
end

const VALID_RENDER_STYLES = ("default", "qutemol")
const VALID_MODEL_TYPES   = ("BALL_AND_STICK", "STICK", "VAN_DER_WAALS", "SAS", "SES",
                             "BACKBONE", "RIBBON", "CARTOON")
const _BACKBONE_MODEL_TYPES = ("BACKBONE", "RIBBON", "CARTOON")

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

# Bundle dedup across notebook cells for the OFFLINE-EXPORT path, where
# `_visualize()` returns the local `Asset` and NoServer would inline the
# ~7 MB bundle as a data: URL into EVERY cell. Bonito's
# `push_dependencies!` emits per-subsession assets via
# `setdiff(sub.imports, root.imports)`, so adding our bundle to the root
# session's imports causes every subsequent subsession to skip
# re-embedding it. The browser registers `BONITO_IMPORTS[hash] =
# import('data:...')` from the first cell that does emit the bundle;
# later cells' JS still references the same `BONITO_IMPORTS[hash]` and
# gets the cached promise.
#
# The interactive path needs none of this: there `_visualize()` returns
# a raw `import('<url>')` expression and the browser module cache dedups
# by URL. (It must also not reach the `push!` below — `root.imports` is
# an `OrderedSet{Asset}` and would reject a JSCode.)
#
# We must NOT push on the very first display in a fresh root session —
# otherwise the setdiff strips the bundle from cell 1 too and no cell
# ever emits it. We track the root session we last saw; if it matches,
# we've already emitted once and can safely dedup.
const _LAST_ROOT = Ref{Union{Nothing, Bonito.Session}}(nothing)

function _maybe_dedup_visualize_asset!(session)
    isnothing(session.parent) && return
    asset = _visualize()
    asset isa Bonito.Asset || return
    root = Bonito.root_session(session)
    if _LAST_ROOT[] !== root
        # First display in this root session — let the bundle emit normally.
        _LAST_ROOT[] = root
        return
    end
    push!(root.imports, asset)
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
    solid_color=dr.solid_color,
    backbone_kwargs=dr.backbone_kwargs)

# Pack one rep for the wire — keep field order in sync with rendering.ts.
_serialize_rep(dr::DisplayedRepresentation) = Dict(
    "repr"      => dr.repr,
    "type"      => dr.type,
    "coloring"  => dr.coloring,
    "density"   => dr.density,
    "visible"   => dr.visible,
    "alpha"     => dr.alpha,
    "wireframe" => dr.wireframe,
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
    # A percentage height cannot work inside a notebook cell: percentages
    # need a definite-height ancestor, and the output area has none. We
    # used to fake one by forcing `$dom.parentNode` to 100vh from JS, but
    # on Bonito >= 5 the sub-session fragment wrappers are
    # `display:contents` (no box), so the forced height evaporated and
    # every scene after the first collapsed to the HUD strip. Convert
    # "N%" to "Nvh" instead — same visual meaning as the old
    # N%-of-100vh, resolved by the viewport with no ancestor dependency.
    # Explicit units (px, vh, em, ...) pass through untouched; width
    # percentages resolve against the output area's width, which is
    # always definite, so width needs no conversion.
    height = endswith(scene.height, "%") ? chop(scene.height) * "vh" : scene.height
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
    alpha_request      = Observable{Any}(nothing)
    wireframe_request  = Observable{Any}(nothing)
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

    on(alpha_request) do payload
        payload isa AbstractDict || return
        i = _resolve_rep_idx(payload)
        i == 0 && return
        # Clamp into [0,1]; bad input (NaN, strings, etc.) silently
        # ignored — UI shouldn't deliver them, but we don't want a
        # malformed payload to throw inside the Bonito handler.
        a = try Float64(payload["alpha"]) catch; return end
        scene.representations[i].alpha = clamp(a, 0.0, 1.0)
        scene_obs[] = _serialize_scene(scene)
    end

    on(wireframe_request) do payload
        payload isa AbstractDict || return
        i = _resolve_rep_idx(payload)
        i == 0 && return
        scene.representations[i].wireframe = Bool(get(payload, "wireframe", false))
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

    visualize_asset = _visualize()
    App() do session::Session
        _maybe_dedup_visualize_asset!(session)
        Bonito.onload(session, dom, js"""
            function (container){
                $(visualize_asset).then(VISUALIZE => {
                    const sceneEl = document.createElement("bv-scene");
                    sceneEl.setAttribute("id", $scene_id);
                    sceneEl.setAttribute("width", "100%");
                    sceneEl.setAttribute("height", "100%");

                    const modelReq      = $(model_request);
                    const coloringReq   = $(coloring_request);
                    const densityReq    = $(density_request);
                    const visibilityReq = $(visibility_request);
                    const alphaReq      = $(alpha_request);
                    const wireframeReq  = $(wireframe_request);
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
                        scene_div.addEventListener("bv-request-alpha",      (e) => alphaReq.notify(e.detail));
                        scene_div.addEventListener("bv-request-wireframe",  (e) => wireframeReq.notify(e.detail));
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

        # The do-block's value is the DOM the App renders. For offline/
        # static export, route it through `record_states`, which renders
        # `dom`, sweeps the widget states, and returns the node with the
        # recorded statemap attached — that's what keeps the exported
        # HTML interactive without a Julia process.
        #
        # Live sessions must NOT go through `record_states`: on Bonito
        # >= 5 sub-sessions share the root's connection (SubConnection
        # was removed), so once the first cell's WebSocket is open,
        # `record_states` in any later cell throws ("Session shouldn't
        # be open" from `while_disconnected`) — and even before the
        # socket opens it consumes the session's queued messages (our
        # `onload` above included) into the statemap, leaving the live
        # path with no scene.
        _is_offline_export() ? Bonito.record_states(session, dom) : dom
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
#
# DON'T memoize the App. IJulia calls `show` once per MIME we declare
# ourselves showable for; Bonito creates a fresh sub-session per show.
# An earlier version of this file cached the App per Scene to avoid
# rebuilding it 4× (one per MIME), but that breaks Bonito's per-session
# Observable caching: the first sub-session emits the full
# RegisterObservable message for each `$(observable)` interpolation,
# and the subsequent sub-sessions emit only a TrackingOnly reference
# (Bonito/src/serialization/caching.jl:add_cached! line 122-126). When
# JupyterLab renders one MIME and discards the others, the rendered
# MIME's session may not be the one that owned the original
# registration — its JS-side observable map then has no entry for the
# id, every `$(alpha_request)`/`$(scene_obs)`/… interpolates as `null`,
# and the back-channel silently dies. Initial state still works because
# it's a value interpolation, not an Observable reference.
#
# A fresh App per show means each sub-session gets its own Observable
# set with a full registration — cheap (~600 B per show with
# HTTPAssetServer), correct, and the original "kernel-crashing 4×
# repetition" concern was a symptom of NoServer's 12 MB inline
# payloads, not the App construction itself. With
# `force_asset_server!(HTTPAssetServer)` (in our __init__), 4× ~600 B
# = ~2.4 KB per cell display.
for _mime in (MIME"text/html",
              MIME"application/prs.juno.plotpane+html",
              MIME"juliavscode/html",
              MIME"application/vnd.Bonito.application+html")
    @eval Base.showable(::$_mime, ::Scene) = true
    @eval Base.show(io::IO, mime::$_mime, scene::Scene) =
        show(io, mime, _build_scene_app(scene))
end

# REPL / scripted use: `stick(sys)` etc. now return a Scene, but
# Bonito's browser-display routes on `App`, not Scene, so the
# auto-open-in-browser behavior stopped firing. Forward Scene to its
# underlying App so Bonito's existing display paths (BrowserDisplay
# + ElectronDisplay) keep working unchanged.
for _DT in (Bonito.HTTPServer.BrowserDisplay,
            Bonito.HTTPServer.ElectronDisplay)
    @eval Base.display(d::$_DT, scene::Scene) =
        Base.display(d, _build_scene_app(scene))
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
    # Empty input → empty Representation. Returning a Scene with no
    # geometry produces a "scene has no displayable geometry" error
    # later; return nothing so callers (notebooks, tests) treat the
    # empty case as a silent no-op, matching the pre-Scene contract.
    _is_empty_representation(initial_r) && return

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

# ---- backbone / ribbon / cartoon ----
#
# These bypass `_push_model!` because their kwargs (tube_radius,
# resolution_along, color tag, spline choice, ...) differ from the
# atom / surface model kwargs `_push_model!` validates. The constructed
# Representation still rides the same wire format — only Babylon's
# backFaceCulling differs (the surface meshes here are closed tubes,
# unlike SAS/SES which are open in tight pockets); see the TS side.
#
# The backbone-specific kwargs are stashed in `dr.backbone_kwargs` on
# the DisplayedRepresentation so a future rebuild (e.g. when we add
# menu-driven editing of tube_radius) can reconstruct the rep.

function _push_backbone_like!(scene::Scene, ac::AbstractAtomContainer,
                              type::AbstractString;
                              kwargs...)
    type_str = String(type)
    type_str in _BACKBONE_MODEL_TYPES ||
        throw(ArgumentError("type must be one of $(_BACKBONE_MODEL_TYPES), got: $type"))

    repr = prepare_model(ac; type=type_str, backbone_kwargs=NamedTuple(kwargs))
    isnothing(repr) && return scene

    dr = DisplayedRepresentation(
        repr, ac, type_str,
        "element",                  # coloring — unused for backbone reps
        _density_level(_density_value("high")),
        Float64(1.5),               # probe_radius — unused
        "#cccccc",                  # solid_color — unused
        true,                       # visible
        NamedTuple(kwargs),         # backbone-specific kwargs (see DisplayedRepresentation)
    )
    _push_representation!(scene, dr)
    return scene
end

function _scene_with_backbone(ac, type;
                              style="default", width="80%", height="60%", kwargs...)
    style_str = String(string(style))
    style_str in VALID_RENDER_STYLES ||
        throw(ArgumentError("style must be one of $(VALID_RENDER_STYLES), got: $style"))
    scene = Scene(style=style_str,
                  width=String(string(width)),
                  height=String(string(height)))
    return _push_backbone_like!(scene, ac, type; kwargs...)
end

"""
    backbone(ac; kwargs...) -> Scene
    backbone!(scene, ac; kwargs...) -> Scene

Sweep a circular tube along a spline through the backbone Cα atoms of
each chain in `ac`. `kwargs` (forwarded to [`BackboneConfig`](@ref)):
`tube_radius`, `resolution_along`, `resolution_cross`, `color`
(`:uniform` / `:chain` / `:rainbow` / `:secondary_structure` / `:residue`),
`spline` (`:linear` / `:catmull_rom` / `:cubic_b`),
`control_point_strategy` (`:c_alpha` / `:mid_points`),
`frame` (`:rmf` / `:second_spline`), `filter` (`:none` / `:angle`),
`fixed_color::NTuple{3,Int}`.

Originally implemented by Dorothee Brohl (see CONTRIBUTING.md).
"""
backbone(ac; kwargs...)                      = _scene_with_backbone(ac, "BACKBONE"; kwargs...)
backbone!(scene::Scene, ac; kwargs...)       = _push_backbone_like!(scene, ac, "BACKBONE"; kwargs...)

"""
    ribbon(ac; kwargs...) -> Scene
    ribbon!(scene, ac; kwargs...) -> Scene

Carson-&-Bugg-style ribbon: an elliptical cross-section swept along a
spline through the peptide-plane midpoints. See [`backbone`](@ref)
for kwarg semantics; sensible ribbon defaults are applied
automatically.
"""
ribbon(ac; kwargs...)                        = _scene_with_backbone(ac, "RIBBON"; kwargs...)
ribbon!(scene::Scene, ac; kwargs...)         = _push_backbone_like!(scene, ac, "RIBBON"; kwargs...)

"""
    cartoon(ac; kwargs...) -> Scene
    cartoon!(scene, ac; kwargs...) -> Scene

Secondary-structure-aware cartoon: circular cross-section for coil,
elliptical for helices, flat rectangular with arrow taper for strands.
If `ac` has no secondary-structure assignment, BCA's
`predict_secondary_structure!` is run automatically.
"""
cartoon(ac; kwargs...)                       = _scene_with_backbone(ac, "CARTOON"; kwargs...)
cartoon!(scene::Scene, ac; kwargs...)        = _push_backbone_like!(scene, ac, "CARTOON"; kwargs...)
