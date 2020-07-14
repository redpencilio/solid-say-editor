import SolidHandler from "./block-handler"; 
import { inject as service } from '@ember/service';
import normalizeLocation from "../../utils/normalize-location";


class EditBlockHandler extends SolidHandler {

    @service auth; 
    
    get scope(){
        return "editor-plugins/say-solid-edit-card";
    }

    isValidBlock(term){
        return term === "me"; 
    }

    get card(){
        return this.scope; 
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
        const selections = editor.selectContext(block.region, {subject: this.auth.webId})
        console.log(selections); 
        const rdfMatched = block.context;
        if (match) {
            const { 0: fullMatch, 1: term, index: start } = match;

            const absoluteLocation = normalizeLocation([start, start + fullMatch.length], block.region);

            if (this.isValidBlock(term)) {
                let cardObj = {
                    // info for the hintsRegistry
                    location: absoluteLocation,
                    card: this.card,
                    // any content you need to render the component and handle its actions
                    info: {
                        hrId, hintsRegistry, editor,
                        term,
                        location: absoluteLocation,
                    }
                };


                hintsRegistry.addHint(hrId, this.scope, cardObj);
            }
        }
    }


}

const single = new EditBlockHandler(); 

export default single; 
