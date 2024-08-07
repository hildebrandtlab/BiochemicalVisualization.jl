using Electron, JSExpr, BioStructures, Gtk
include("src/julia/MainWindow.jl")
include("src/julia/Helpers.jl")
include("src/julia/MyWidgets.jl")
include("src/julia/ButtonListeners.jl")


electron_options = Dict{String, Any}("width" => 1200, "height" => 800, "center" => true,
                                     "frame" => true, "fullscreen" => false, "icon" => "res/ballview.ico")

win, app = createMainWindow(electron_options)
createInitialLayout(win)
createMenuBar(win)

while win.exists
    listenToJS(win)
end
nothing
