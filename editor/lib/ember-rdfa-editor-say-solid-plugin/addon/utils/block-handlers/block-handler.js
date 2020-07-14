import normalizeLocation from "../../utils/normalize-location";

export default class SolidBlockHandler {

    get regex() {
        return /solid:([a-z]+)/;
    }

    get scope() {
        return undefined;
    }

    isValidBlock(term) {
        return false;
    }
    get card() {
        return undefined;
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
        const match = block.text.match(this.regex);

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

    handleClose(info, html){
        info.hintsRegistry.removeHintsAtLocation( info.location, info.hrId, this.scope);
        const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
        const selection = info.editor.selectHighlight( mappedLocation );
        info.editor.update( selection, {
            set: { innerHTML: html }
        });
    }
}