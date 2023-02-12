"""
    createHTMLButton(win, func, label)

Create an HTML button in `win` with `label` as label, placed at the beginning of the document.

Button calls on click `func` in Julia.
"""
function createHTMLButton(win::Electron.Window, func::Function, label::String)::Nothing
    funcString = "$func"
    buildString = @js """<button class='design' id='""" + $label + """' onclick='sendMessageToJulia(\"""" + $funcString + """\")'>""" + $label + """</button>"""
    html = runElectron(win.app, buildString)
    code = @js document.body.insertAdjacentHTML("afterbegin", $html)
    
    try runElectron(win, code) catch end
    nothing
end


"""
    createHTMLButton(win, func, label, before)

Create an HTML button in `win` with `label` as label, placed before button with ID `before`.

Button calls on click `func` in Julia.
"""
function createHTMLButton(win::Electron.Window, func::Function, label::String, before::String)::Nothing
    funcString = "$func"
    buildString = @js """<button class='design' id='""" + $label + """' onclick='sendMessageToJulia(\"""" + $funcString + """\")'>""" + $label + """</button>"""
    html = runElectron(win.app, buildString)
    code = @js document.getElementById($before).insertAdjacentHTML("beforebegin", $html)
    
    try runElectron(win, code) catch end
    nothing
end


"""
    createModelMenu(win, all_models)

Create the dropdown menu for changing models in `win` after loading a structure.

Available models are specified in `all_models`.
"""
function createModelMenu(win::Electron.Window, all_models::Vector{MV_Model})::Nothing
    code =
        @js begin
            @var dropdown = document.createElement("select")
            dropdown.setAttribute("id", "modelMenu")
            dropdown.setAttribute("class", "design")

            @var len = $(length(all_models))
            @var all_models = $all_models
            for i in 0:len-1
                @var model = document.createElement("option")
                model.setAttribute("value", all_models[i].value)
                model.innerText = all_models[i].label
                dropdown.appendChild(model)
            end

            if ($(existsHTML(win, "Reset Camera"))) id = "Reset Camera" else id = "Exit" end
            document.getElementById(id).before(dropdown)            

            window.dispatchRerender("BallsAndSticks")
            dropdown.addEventListener("change", function(event)
                window.dispatchRerender(event.target.value)
            end)
        end

    try runElectron(win, code) catch end
    nothing
end


"""
    createPDBInput(win)

Create the PDB input box in `win` as part of 'Load PDB by ID' button behavior.
"""
function createPDBInput(win::Electron.Window)::Nothing
    code = 
        @js begin
            @var pdb = document.createElement("input")
            pdb.setAttribute("id", "PDB")
            pdb.setAttribute("type", "text")
            pdb.setAttribute("class", "design")
            pdb.setAttribute("placeholder", "Enter PDB here")
            document.getElementById("Load PDB by ID").after(pdb)

            pdb.addEventListener("keydown", function(event)
                if (event.ctrlKey && event.key == "Enter")
                    sendMessageToJulia(["handleCtrlEnterButton", pdb.value])
                    pdb.remove()
                else
                    if (event.key == "Enter")
                        sendMessageToJulia(["handleEnterButton", pdb.value])
                        pdb.remove()
                    end
                end
            end)
        end

    runElectron(win, code)
    nothing
end


"""
    createInitialLayout(win)

Create the initial HTML layout in `win` including CSS.
"""
function createInitialLayout(win::Electron.Window)::Nothing
    style = read("src/css/mystyle.css", String)
    code = @js document.body.insertAdjacentHTML("beforeend", "<style>" + $style + "</style>")
    try runElectron(win, code) catch end
    
    createHTMLButton(win, handleExit, "Exit")
    createHTMLButton(win, handleLoadPDB, "Load PDB by ID")
    createHTMLButton(win, handleSelectFile, "Select File")
    nothing
end
nothing
