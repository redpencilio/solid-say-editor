import SolidHandler from "./block-handler";
import { inject as service } from '@ember/service';
import normalizeLocation from "../normalize-location";
const SAVE_RESET_KEY = "say-solid:save-reset-block-handler";

export { SAVE_RESET_KEY };

/**
 * Handler class responsible for handling events coming from the dispatcher by relevant contexts (when the user has made changes to solid-data) and removing and insert save-reset-cards
 *
 * @module editor-say-solid-plugin
 * @class SaveResetBlockHandler
 * @extends Ember.Component
 */
export default class SaveResetBlockHandler extends SolidHandler {

    @service profile;

    get scope() {
        return "editor-plugins/say-solid-save-reset-card";
    }

    get card() {
        return this.scope;
    }

    // Closes the save-reset card
    handleClose(info, html){
        info.hintsRegistry.removeHintsAtLocation( info.location, info.hrId, this.scope);
        this.profile.madeChanges = false;
    }

    // This card is shown when the user has made changes to solid-data in the editor
    hasRelevantContext(block) {
        return this.profile.madeChanges;
    }
    /**
     * 
     * Responsible from creating and rendering a persisting card that allows a user to save or reset data
     * This method first removes other cards from the same scope
     * 
     * @method handle
     * 
     * @param {string} hrId Unique identifier of the state in the HintsRegistry.  Allows the
     * HintsRegistry to update absolute selected regions based on what a user has entered in between.
     * @param {object} block A logical blob for which the content may have changed. A blob
     * either has a different semantic meaning, or is logically separated (eg: a separate list item).
     * @param {Object} hintsRegistry Keeps track of where hints are positioned in the editor.
     * @param {Object} editor Your public interface through which you can alter the document.
     */
    handle(hrId, block, hintsRegistry, editor) {
        const region = editor.richNode.region;
        // const hints = hintsRegistry.getHintsInRegion(region, hrId, this.scope);
        hintsRegistry.removeHintsInRegion(region, hrId, this.scope);
        if (this.hasRelevantContext(block)) {
            let cardObj = {
                // info for the hintsRegistry
                location: region,
                card: this.card,
                // any content you need to render the component and handle its actions
                info: {
                    hrId, hintsRegistry, editor, block,
                    location: region,
                }
            };
            hintsRegistry.addHint(hrId, this.scope, cardObj);

        }
    }


}

