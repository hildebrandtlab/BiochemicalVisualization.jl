export
    ball_and_stick,
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

function prepare_model(ac::AbstractAtomContainer; type="BALL_AND_STICK")
    if type == "BALL_AND_STICK"
        return prepare_ball_and_stick_model(ac)
    elseif type == "STICK"
        return prepare_stick_model(ac)
    elseif type == "VAN_DER_WAALS"
        return prepare_van_der_waals_model(ac)
    end

    return nothing
end

const VALID_RENDER_STYLES = ("default", "qutemol")
const VALID_MODEL_TYPES   = ("BALL_AND_STICK", "STICK", "VAN_DER_WAALS")

function display_model(
    ac::AbstractAtomContainer;
    type="BALL_AND_STICK",
    style="default",
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

    dom = DOM.div(;style="width: $width; height: $height;")

    # Build only the initially-active representation. The other two are
    # recomputed on demand when the user switches via the menu. This keeps
    # initial latency and wire size proportional to the molecule size, not
    # to the number of model variants — the right choice for large systems.
    initial_r = prepare_model(ac; type=type_str)
    if isnothing(initial_r)
        return
    end

    all_primitives = vcat(values(initial_r.primitives)...)
    if isempty(all_primitives)
        return
    end
    focus_point = mean(_center.(all_primitives))

    # Two observables form the JS↔Julia channel for model switching:
    #   model_request : JS sets when the user clicks the Model menu button
    #   repr_obs      : Julia sets after rebuilding; JS dispatches add-representation
    model_request = Observable(type_str)
    repr_obs      = Observable{Any}(initial_r)

    on(model_request) do requested
        requested in VALID_MODEL_TYPES || return
        new_r = prepare_model(ac; type=requested)
        isnothing(new_r) && return
        repr_obs[] = new_r
    end

    App() do session::Session
        Bonito.onload(session, dom, js"""
            function (container){
                $(VISUALIZE).then(VISUALIZE => {
                    parent = $dom.parentNode;
                    parent.style.height = '100vh';

                    const scene = document.createElement("bv-scene");
                    scene.setAttribute("id", "bv-scene-1");
                    scene.setAttribute("width", $width);
                    scene.setAttribute("height", $height);

                    const modelReq = $(model_request);
                    const reprObs  = $(repr_obs);

                    document.addEventListener('bv-scene-mounted', () => {
                        function forwardToScene(eventName, data, component) {
                            if (component) {
                                const event = new CustomEvent(eventName, { detail: data });
                                component.dispatchEvent(event);
                            } else {
                                console.warn("React Web Component not found!");
                            }
                        }

                        const scene_div = document.getElementById("bv-scene-1-div");

                        forwardToScene("set-focus", { focus_point: $focus_point }, scene_div);
                        forwardToScene("add-representation", { representation: $initial_r, active: $type_str }, scene_div);
                        forwardToScene("set-render-mode", { ssao_mode: 2, debug: false, style: $style_str }, scene_div);

                        // JS → Julia: scene asks for a different model variant
                        document.addEventListener("bv-request-model", (e) => {
                            modelReq.notify(e.detail.type);
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
