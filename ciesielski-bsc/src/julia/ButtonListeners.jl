"""
    handleExit(win)

Close the window `win` and its application as part of 'Exit' button behavior.
"""
function handleExit(win::Electron.Window)::Nothing
    close(win.app)
    nothing
end


"""
    handleSelectFile(win)

Dispatch JavaScript `loadFile` event as part of 'Select File' button behavior.

Visualize selected structure file.
"""
function handleSelectFile(win::Electron.Window)::Nothing
    #file_path = open_dialog("Pick a file", GtkNullContainer(), ("*.pdb", "*.stl", "*.obj"))

    dispatchLoadFile(win)
    nothing
end


"""
    handleLoadPDB(win)

Create input box for PDB IDs as part of 'Load PDB by ID' button behavior.
"""
function handleLoadPDB(win::Electron.Window)::Nothing
    if !existsHTML(win, "PDB")
        createPDBInput(win)
    end
    nothing
end


"""
    handleCtrlEnterButton(win, pdb)

Download PDB from database corresponding to `pdb`.

If `pdb` is not a valid PDB-ID, show a warning and do not download anything.
"""
function handleCtrlEnterButton(win::Electron.Window, pdb::String)::Nothing
    pdb = uppercase(pdb)

    if isfile(joinpath("$(pwd())/res/models/pdb/", "$pdb.pdb"))
        msg = "$pdb already exists. Display PDB?"
    else
        try
            println("$(pwd())/models/pdb")
            path = downloadpdb(pdb, dir="$(pwd())/res/models/pdb/")
            msg = "$pdb downloaded succesfully! Display PDB?"
        catch ArgumentError
            Gtk.warn_dialog("PDB not found. Please try again.")
            return
        end
    end

    if !Gtk.ask_dialog(msg, "Yes", "No")
        handleEnterButton(win, pdb)
    end
    nothing
end


"""
    handleEnterButton(win, pdb)

Visualize PDB file corresponding to `pdb` found in online database.

If `pdb` is not a valid PDB-ID, show a warning and do not visualize anything.
"""
function handleEnterButton(win::Electron.Window, pdb::String)::Nothing
    pdb = uppercase(pdb)
    
    try
        dispatchLoadPDB(win, pdb)
    catch UndefVarError
        Gtk.warn_dialog("PDB not found. Please try again.")
        return
    end
    nothing
end


"""
    handleResetViewer(win)

Reset the application to its initial state as part of 'Reset Viewer' button behavior.
"""
function handleResetViewer(win::Electron.Window)::Nothing
    dispatchResetViewer(win)
    
    widgetIDs = ["modelMenu", "PDB", "Reset Camera", "Reset Viewer"]
    for widget in widgetIDs
        removeHTML(win, widget)
    end
    nothing
end


"""
    handleResetCamera(win)

Reset the viewer's camera position to its initial state as part of 'Reset Camera' button behavior.
"""
function handleResetCamera(win::Electron.Window)::Nothing
    dispatchResetCamera(win)
    nothing
end


"""
    handleLayoutChange(win, modelmenu)

Create additional widgets in `win` after a file has been selected.

If `modelmenu` is set to `false`, then no model menu will be created.
"""
function handleLayoutChange(win::Electron.Window, modelmenu::Bool=true)::Nothing
    if !modelmenu
        removeHTML(win, "modelMenu")
    elseif modelmenu && !existsHTML(win, "modelMenu")
        MODELS = readModelsFromJS(win)
        createModelMenu(win, MODELS)
    end
    
    if !existsHTML(win, "Reset Viewer") && !existsHTML(win, "Reset Camera")
        createHTMLButton(win, handleResetCamera, "Reset Camera", "Exit")
        createHTMLButton(win, handleResetViewer, "Reset Viewer", "Exit")
    end
    nothing
end


"""
    handleChangeSize(win, percent)

Change the window's size to the user's screen size multiplied by `percent`.

`percent` needs to represent a number between 0 and 1.
"""
function handleChangeSize(win::Electron.Window, percent::String)::Nothing
    perc = parse(Float64, percent)
    code =
        @js begin
            @var size = electron.screen.getPrimaryDisplay().workAreaSize
            @var w = electron.BrowserWindow.fromId($(win.id))
            w.setSize(size.width*$perc, size.height*$perc)
        end
    
    try runElectron(win.app, code) catch end
    nothing
end
nothing
