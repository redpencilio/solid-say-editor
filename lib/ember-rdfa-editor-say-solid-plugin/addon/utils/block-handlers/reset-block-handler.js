import SolidHandler from "./block-handler";
import { inject as service } from '@ember/service';
import { FOAF } from "solid-addon/utils/namespaces";

const RESET_KEY = "say-solid:reset-block-handler"

export {RESET_KEY}; 

export default class ResetBlockHandler extends SolidHandler {

    @service profile; 

    get scope() {
        return "editor-plugins/say-solid-reset-card";
    }


    get card() {
        return this.scope;
    }

    handleClose(info) {
        info.hintsRegistry.removeHintsAtLocation(info.location, info.hrId, this.scope);
    }

    /**
     * @param {string} hrId Unique identifier of the state in the HintsRegistry.  Allows the
     * HintsRegistry to update absolute selected regions based on what a user has entered in between.
     * @param {object} block A logical blob for which the content may have changed. A blob
     * either has a different semantic meaning, or is logically separated (eg: a separate list item).
     * @param {Object} hintsRegistry Keeps track of where hints are positioned in the editor.
     * @param {Object} editor Your public interface through which you can alter the document.
     */
    handle(hrId, block, hintsRegistry, editor) {
        const region = editor.richNode.region;
        hintsRegistry.removeHintsInRegion(region, hrId, this.scope);

        if (this.profile.madeChanges) {
            let card = {

                // info for the hintsRegistry
                location: region,
                card: this.card,
                // any content you need to render the component and handle its actions
                info: {
                    hrId, hintsRegistry, editor, block,
                    location: region,
                }
            };
            hintsRegistry.addHint(hrId, this.scope, card); 
        }
    }
}