"""
    MV_Model(value, label)

Create an `MV_Model` (Molecule Visualizer Model) object, covering JavaScript `value` and `innerText` attributes of HTML `option` elements used for model changes.

# Fields
- value: `value` must correspond to an attribute of the `Model.modelSettings` object in `MoleculeVisualizer/js/Model.js`.
- label: `label` specifies the label displayed in the model options menu.
"""
struct MV_Model
    value::String
    label::String
end


"""
    runElectron(win, code)

Run JavaScript code `code` in Electron renderer process of `win`.
"""
function runElectron(win::Electron.Window, code::JSString)
    return Electron.run(win, "$code")
end


"""
    runElectron(app, code)

Run JavaScript code `code` in Electron main process of `app`.
"""
function runElectron(app::Electron.Application, code::JSString)
    return Electron.run(app, "$code")
end


"""
    existsHTML(win, id)

Return `true` if HTML element with ID `id` already exists in `win`, else return `false`.
"""
function existsHTML(win::Electron.Window, id::String)::Bool
    code =
        @js begin
            @var exists = !!(document.getElementById($id))
            exists
        end
    exists = runElectron(win, code)

    return exists
end


"""
    removeHTML(win, id)

Remove HTML element with ID `id` from `win` and return if deletion was successful.
"""
function removeHTML(win::Electron.Window, id::String)::Bool
    if existsHTML(win, id)
        code =
            @js begin
                document.getElementById($id).remove()
            end
        runElectron(win, code)
        return true
    else
        return false
    end
end


"""
    readModelsFromJS(win)

Return a 1-dimensional Array covering all `MV_Model` objects available for model changes.

Available models are read from JavaScript implementation in `MoleculeVisualizer/js/Model.js`.
"""
function readModelsFromJS(win::Electron.Window)::Vector{MV_Model}
    code = @js window.visualizer.moleculeModel.modelSettings
    js_models = runElectron(win, code)
    
    mv_models = []
    for (value, _) in js_models
        label = join(split(value, r"(?=[A-Z])"), " ")
        insert!(mv_models, 1, MV_Model(value, label))
    end

    # Add Cartoon model separately since it is not included in `MoleculeVisualizer/js/Model.js` and is still a WIP.
    push!(mv_models, MV_Model("cartoon", "Cartoon (WIP)"))

    return mv_models
end


"""
    dispatchLoadFile(win)

Call the JavaScript 'dispatchLoadFile' function implemented in 'src/js/JuliaDispatcher.js' from Julia.
"""
function dispatchLoadFile(win::Electron.Window)
    runElectron(win, @js window.dispatchLoadFile())
end


"""
    dispatchRerender(win, id)

Call the JavaScript 'dispatchRerender' function implemented in 'src/js/JuliaDispatcher.js' from Julia.
"""
function dispatchRerender(win::Electron.Window, id::String)
    runElectron(win, @js window.dispatchRerender($id))
end


"""
    dispatchLoadPDB(win, pdb)

Call the JavaScript 'dispatchLoadPDB' function implemented in 'src/js/JuliaDispatcher.js' from Julia.
"""
function dispatchLoadPDB(win::Electron.Window, pdb::String)
    runElectron(win, @js window.dispatchLoadPDB($pdb))
end


"""
    dispatchResetCamera(win)

Call the JavaScript 'dispatchResetCamera' function implemented in 'src/js/JuliaDispatcher.js' from Julia.
"""
function dispatchResetCamera(win::Electron.Window)
    runElectron(win, @js window.dispatchResetCamera())
end


"""
    dispatchResetViewer(win)

Call the JavaScript 'dispatchResetViewer' function implemented in 'src/js/JuliaDispatcher.js' from Julia.
"""
function dispatchResetViewer(win::Electron.Window)
    runElectron(win, @js window.dispatchResetViewer())
end
nothing
