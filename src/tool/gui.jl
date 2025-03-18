using BiochemicalAlgorithms
using BiochemicalVisualization
using Bonito
import Bonito.TailwindDashboard as D



Page() # required for multi cell output inside documenter
App() do
    style = Styles(
        CSS("font-weight" => "500"),
        CSS(":hover", "background-color" => "silver"),
        CSS(":focus", "box-shadow" => "rgba(0, 0, 0, 0.5) 0px 0px 5px"),
    )

    PCard(p) = Card(p, padding="0px", margin="0px")

    sys = System()#load_pdb(ball_data_path("../test/data/AlaAla.pdb"))
    sys_obs = Observable(sys)
    representation = Observable(stick(sys_obs))

    file_input = D.FileInput()
    on(file_input.value) do file
        if file !== nothing && !isempty(file)
            try
                sys = load_pdb(file)  # Load the PDB file
                notify(sys_obs)      # Update the observable with the new system
                representation[] = stick(sys_obs)  # Update the visualization
                @info "File loaded successfully: $file"
            catch e
                @error "Failed to load file: $file. Error: $e"
            end
        else
            @warn "No file selected or file path is empty."
        end
    end

    dropdown = Dropdown(["ball_and_stick", "stick", "van_der_waals"]; index=2, style=style)
    on(dropdown.value) do value
        if value == "ball_and_stick"
            representation[] = ball_and_stick(sys_obs)
        elseif value == "stick"
            representation[] = stick(sys_obs)
        elseif value == "van_der_waals"
            representation[] = van_der_waals(sys_obs)
        end
    end

    bonds_button = Button("Build_bonds"; style=style)

    on(bonds_button.value) do click::Bool
        fdb = FragmentDB()
        normalize_names!(sys, fdb)
        reconstruct_fragments!(sys, fdb)
        build_bonds!(sys, fdb)
        notify(sys_obs)
        @info "Button clicked!"
    end


    grid = Grid(
        PCard(file_input),
        PCard(dropdown),
        PCard(bonds_button),
        PCard(representation);
        columns="repeat(auto-fit, minmax(300px, 1fr))", justify_items="center")

    return DOM.div(
        DOM.h1("BiochemicalVisualization.jl"),
        grid
    )

end