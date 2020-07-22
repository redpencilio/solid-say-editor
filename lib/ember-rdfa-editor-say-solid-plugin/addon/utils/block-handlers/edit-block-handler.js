import SolidHandler from "./block-handler";
import { inject as service } from '@ember/service';
import normalizeLocation from "../../utils/normalize-location";
import { FOAF } from "solid-addon/utils/namespaces";
const EDIT_KEY = "say-solid:edit-block-handler";

export { EDIT_KEY };


export default class EditBlockHandler extends SolidHandler {

    @service("solid-auth") auth;

    get scope() {
        return "editor-plugins/say-solid-edit-card";
    }

    isValidBlock(term) {
        return term === "me";
    }

    get card() {
        return this.scope;
    }


    hasRelevantContext(block) {
        return block.context.find(ctxt => {
            return ctxt.subject === this.auth.webId && ctxt.predicate === FOAF("name").value;
        }
        );
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

        hintsRegistry.removeHintsInRegion(block.region, hrId, this.scope);
        const rdfMatched = this.hasRelevantContext(block);
        if (rdfMatched) {

            const textTrimmed = block.text.replace(/\s*$/, "");
            const spacesAtTheStart = textTrimmed.length - block.text.trim().length;
            const absoluteLocation = normalizeLocation([spacesAtTheStart, spacesAtTheStart + textTrimmed.length], block.region);
            let cardObj = {
                // info for the hintsRegistry
                location: absoluteLocation,
                card: this.card,
                // any content you need to render the component and handle its actions
                info: {
                    hrId, hintsRegistry, editor,
                    location: absoluteLocation,
                }
            };


            hintsRegistry.addHint(hrId, this.scope, cardObj);

        }
    }


}

