# Bachelor Thesis


## Name
BALLView.jl

## Description
This project is meant to work as an interface between the still in-development 'BiochemicalAlgorithms.jl' package and a JavaScript visualization library called 'Molecule Visualizer'. It is meant to work as a front-end for the Julia package, serving as a molecular modelling and visualization tool and a successor to 'BALLView'.
The project is still a work-in-progress.

## Installation
For the application to work, the latest versions of [Julia](https://julialang.org/downloads/) and [Node.js](https://nodejs.org/en/download/) need to be installed. Make sure to add Julia to your PATH variable.
All modules and libraries used by the project can be installed via the following commands:
```bash
> cd ciesielski-bsc
> julia install.jl
```
```bash
> cd ciesielski-bsc/dep/pfannes_bsc/src/MoleculeVisualizer
> npm install
```

## Usage
To start the application run the following command:
```bash
> cd ciesielski-bsc
> julia main.jl
```
Most available functionalities can be read in "ciesielski-bsc/Usecases.md". Have fun!

## Authors and acknowledgment
The Julia application is written by Mateusz Ciesielski, relying on a JavaScript visualization library written by Pascal Pfannes.
The specific ownership of each code can be read in "ciesielski-bsc/Disclaimer.md".

## License
[MIT](https://choosealicense.com/licenses/mit/)

## Project status
The project is still a work-in-progress. Most of the functionalities of the JavaScript 'Molecule Visualizer' have been successfully integrated into and are callable from within Julia, however the functionalities of 'BiochemicalAlgorithms.jl' still need to be integrated -- which should not be a problem anymore, since everything is currently running in Julia and was specifically designed for a smooth integration.
