using BiochemicalVisualization
using Documenter

DocMeta.setdocmeta!(BiochemicalVisualization, :DocTestSetup, :(using BiochemicalVisualization); recursive=true)

makedocs(;
    modules=[BiochemicalVisualization],
    authors="Andreas Hildebrandt <andreas.hildebrandt@uni-mainz.de> and contributors",
    repo=Remotes.GitHub("hildebrandtlab", "BiochemicalVisualization.jl"),
    sitename="BiochemicalVisualization.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://hildebrandtlab.github.io/BiochemicalVisualization.jl",
        assets=String[],
    ),
    pages=[
        "Home" => "index.md",
        "Getting started" => "tutorials/getting_started.md"
    ],
)

deploydocs(;
    repo="github.com/hildebrandtlab/BiochemicalVisualization.jl",
    devbranch="develop",
)
