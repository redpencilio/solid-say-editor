import normalizeLocation from "../../utils/normalize-location";
import EmberObject from '@ember/object';

export default class SolidBlockHandler extends EmberObject {


    /**
     * Scope of the handler to be used in registration of the hint card in the 
     * `hintsRegistry`.
     */
    get scope() {
        return undefined;
    }

    /**
     * The component path of the card to be shown.
     */
    get card() {
        return undefined;
    }


    /**
     * Handles the closing of the block component and inserts the given 
     * html in the selection.
     * 
     * @param {Object} info meta info object containing necessary info to handle the closing of the component. 
     * @param {String} html HTML string to be injected at the selected area. 
     */
    handleClose(info, html) {
        info.hintsRegistry.removeHintsAtLocation(info.location, info.hrId, this.scope);
        const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
        const selection = info.editor.selectHighlight(mappedLocation);
        info.editor.update(selection, {
            set: { innerHTML: html }
        });
    }
}