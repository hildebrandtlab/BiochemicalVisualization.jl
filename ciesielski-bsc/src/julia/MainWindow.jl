"""
    createMainWindow(electron_options, debug)

Build the main window `win` and the corresponding application `app` according to `electron_options`.

Open DevTools at window start-up if `debug` is set to `true`.
"""
function createMainWindow(electron_options::Dict{String, Any}, debug=false::Bool)::Tuple{Electron.Window, Electron.Application}
    
    win = Electron.Window(electron_options)
    Electron.load(win, URI("file://$(pwd())/dep/pfannes_bsc/src/MoleculeVisualizer/index.html"))
    
    if debug ElectronAPI.toggleDevTools(win) end           # Open DevTools at window start-up if debugging.

    code = @js app.allowRendererProcessReuse = false       # node-pty does not support renderer process reuse.
    runElectron(win.app, code)                             # Include if trying shell integration. (WIP)

    return win, win.app
end


"""
    createMenuBar(win)

Create a menu bar in `win` for additional features.
"""
function createMenuBar(win::Electron.Window)::Nothing
    code =
        @js begin
            @var w = electron.BrowserWindow.fromId($(win.id))

            @var menuTemplate = [Dict("label" => "File",
                                     "submenu" => [Dict("label" => "Select File", "click" => () -> w.webContents.send("toJulia", "handleSelectFile")),
                                                   Dict("label" => "Load PDB by ID", "click" => () -> w.webContents.send("toJulia", "handleLoadPDB")),
                                                   Dict("label" => "Exit", "click" => () -> w.webContents.send("toJulia", "handleExit"))]),
                                 Dict("label" => "View",
                                     "submenu" => [Dict("label" => "Reset Camera", "click" => () -> w.webContents.send("toJulia", "handleResetCamera")),
                                                   Dict("label" => "Reset Viewer", "click" => () -> w.webContents.send("toJulia", "handleResetViewer"))]),
                                 Dict("label" => "Window",
                                      "submenu" => [Dict("label" => "Change Window Size",
                                                         "submenu" => []),
                                                    Dict("label" => "Center Window", "click" => () -> w.center()),
                                                    Dict("label" => "Toggle Fullscreen", "click" => () -> w.setFullScreen(!(w.isFullScreen())))]),
                                 Dict("label" => "Debug",
                                      "submenu" => [Dict("label" => "Toggle DevTools", "click" => () -> w.toggleDevTools()),
                                                    Dict("label" => "Open Julia REPL", "click" => () -> begin
                                                                                                            $(JSString("const { exec } = require('child_process')"))
                                                                                                            exec("start julia")
                                                                                                        end)])]
            
            windowSizeMenu = menuTemplate[2]["submenu"][0]["submenu"]
            for i in 1:10
                windowSizeMenu.push(Dict("label" => i + "0%", "value" => "" + i/10, "click" => (event) -> w.webContents.send("toJulia", ["handleChangeSize", event.value])))
            end
            
            @var menu = electron.Menu.buildFromTemplate(menuTemplate)
            electron.Menu.setApplicationMenu(menu)
        end
    
    runElectron(win.app, code)
    nothing
end


"""
    listenToJS(win)

Listen to JavaScript `sendMessageToJulia(msg)` channel of `win` and evaluate `msg` as a Julia function call.

`msg` is supposed to be either:
- a String containing a Julia function: `msg = "\$func::Function"::String`, or
- a 1-dimensional Array containig the function String and its arguments: `msg = ["\$func::Function"::String, args...::Any]::Vector{Any}`.
"""
function listenToJS(win::Electron.Window)::Nothing
    msg = try take!(msgchannel(win)) catch InvalidStateException end

    if msg !== nothing
        try
            eval(Symbol(msg))(win)
        catch UndefVarError
            eval(Symbol(msg[1]))(win, msg[2:length(msg)]...)
        end
    end
    nothing
end
nothing
