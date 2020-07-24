import SolidHandler from "./block-handler";
import { inject as service } from '@ember/service';
import normalizeLocation from "../../utils/normalize-location";
const SAVE_KEY = "say-solid:save-block-handler";

export { SAVE_KEY };


export default class SaveBlockHandler extends SolidHandler {

    @service("solid-auth") auth;
    @service profile;

    get scope() {
        return "editor-plugins/say-solid-save-card";
    }

    get card() {
        return this.scope;
    }

    handleClose(info, html){
        info.hintsRegistry.removeHintsAtLocation( info.location, info.hrId, this.scope);
        this.profile.madeChanges = false;
    }


    hasRelevantContext(block) {
        return this.profile.madeChanges;
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
        const hints = hintsRegistry.getHintsInRegion(region, hrId, this.scope);
        // hintsRegistry.removeHintsInRegion(block.region, hrId, this.scope);
        if (this.hasRelevantContext(block) && hints.length === 0) {
            let cardObj = {
                // info for the hintsRegistry
                location: region,
                card: this.card,
                // any content you need to render the component and handle its actions
                info: {
                    hrId, hintsRegistry, editor,
                    location: region,
                }
            };
            hintsRegistry.addHint(hrId, this.scope, cardObj);

        }
    }


}

