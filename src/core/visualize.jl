export
    ball_and_stick,
    stick,
    van_der_waals

const VISUALIZE = ES6Module(asset_path("../typescript/dist/biochemicalvisualization.js"))::Asset

sp = Base.source_path()


hex_colors = [hex(RGB((e ./ 255)...)) for e in ELEMENT_COLORS]

element_color(e) = "0x"*lowercase(get(hex_colors, Int(e), hex_colors[end]))

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

function display_model(
    ac::Union{AbstractAtomContainer, Observable{<:AbstractAtomContainer}}; 
    type="BALL_AND_STICK", 
    width="80%", 
    height="60%"
)
  dom = DOM.div(;style="width: $width; height: $height;")


	or, r = if ac isa Observable
		or = map(a -> prepare_model(a; type=type), ac)
		or, or.val
	else
		nothing, prepare_model(ac; type=type)
	end

	if isnothing(r)
		return
	end

	# compute the center of mass of the geometry
	focus_point = mean(center.(vcat(values(r.primitives)...)))

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
          
          document.addEventListener('bv-scene-mounted', () => {
            console.log('component mounted');

            function forwardToScene(eventName, data, component) {
              if (component) {
                  const event = new CustomEvent(eventName, { detail: data });
                  component.dispatchEvent(event);
              } else {
                  console.warn("React Web Component not found!");
              }
            }

            scene_div = document.getElementById("bv-scene-1-div");

            forwardToScene("set-focus", { focus_point: $focus_point }, scene_div);
            forwardToScene("add-representation", { representation: $r}, scene_div);
            forwardToScene("set-render-mode", { ssao_mode: 2, debug: false }, scene_div);
          });

          $dom.appendChild(scene);
        })
		  }
		""")

		if ac isa Observable
			on(r -> Bonito.evaljs(session, js"""
				$(VISUALIZE).then(
					VISUALIZE => {
						// todo: implement
            //VISUALIZE.updateRepresentation(0, $r)
						//VISUALIZE.render()
					}
				)"""), session, or)
		end

		Bonito.record_states(session, dom)
	end
end

"""
    ball_and_stick(::AbstractAtomContainer, kwargs...)

Creates and displays a ball-and-stick representation for the given atom container.
"""
ball_and_stick(ac; kwargs...) = display_model(ac; type="BALL_AND_STICK", kwargs...)

"""
    stick(::AbstractAtomContainer, kwargs...)

Creates and displays a stick representation for the given atom container.
"""
stick(ac; kwargs...)          = display_model(ac; type="STICK", kwargs...)

"""
    van_der_waals(::AbstractAtomContainer, kwargs...)

Creates and displays a van-der-Waals representation for the given atom container.
Sphere radii generally depend on the `radius` field of the corresponding atoms but
are at least 1 Å.
"""
van_der_waals(ac; kwargs...)  = display_model(ac; type="VAN_DER_WAALS", kwargs...)
