import {visualizer} from "../../dep/pfannes_bsc/src/MoleculeVisualizer/js/main.js"

/**
 * Dispatch the JavaScript `loadFile` event implemented in `MoleculeVisualizer/js/Visualizer.js`.
 */
 export function dispatchLoadFile() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.obj, .pdb, .stl';
    input.onchange = _this => {
        const files = Array.from(input.files);

        let modelMenu;
        if (files[0].name.split('.').pop() != 'pdb') { modelMenu = false; } else { modelMenu = true; }
        sendMessageToJulia(["handleLayoutChange", modelMenu]);

        visualizer.EventManager.dispatchEvent({type: 'loadFile', fileToLoad: files});
    }
    input.click();
}


/**
 * Create a JavaScript `File` object out of a PDB file available in the online RCSB database corresponding to `pdb`.
 * 
 * Then, dispatch the JavaScript `loadFile` event implemented in `MoleculeVisualizer/js/Visualizer.js` with the created `File` object as argument.
 * @param {String} pdb 
 */
export async function dispatchLoadPDB(pdb) {
    await fetch(`https://files.rcsb.org/view/${pdb}.pdb`).then((response) => {
        if (response.ok == false) {
            throw new Error();
        }
        return response;
    }).then(async (response) => {
        let data = await response.blob();
        let metadata = {
            type: 'chemical/x-pdb'
        };
        let pdb_file = new File([data], `${pdb}.pdb`, metadata);
        sendMessageToJulia("handleLayoutChange")
        visualizer.EventManager.dispatchEvent({type: 'loadFile', fileToLoad: [pdb_file]});
    });
}


/**
 * Dispatch the JavaScript `rerender` event implemented in `MoleculeVisualizer/js/Visualizer.js`.
 * 
 * Rerenders structure into the model specified by `id` if model is implemented in `MoleculeVisualizer/js/Model.js`.
 * @param {String} id 
 */
export function dispatchRerender(id) {
    let settings = visualizer.moleculeModel.modelSettings
    for (let value in settings) {
        settings[value] = false;
    }
    settings[id] = true;

    visualizer.EventManager.dispatchEvent({type: 'rerender', modelSettings: settings});
}


/**
 * Dispatch the JavaScript `resetViewer` event implemented in `MoleculeVisualizer/js/Visualizer.js`.
 */
export function dispatchResetViewer() {
    visualizer.EventManager.dispatchEvent({type: 'resetViewer'});
}


/**
 * Dispatch the JavaScript `resetCamera` event implemented in `MoleculeVisualizer/js/Visualizer.js`.
 */
export function dispatchResetCamera() {
    visualizer.EventManager.dispatchEvent({type: 'resetCamera'});
}


export {visualizer}
