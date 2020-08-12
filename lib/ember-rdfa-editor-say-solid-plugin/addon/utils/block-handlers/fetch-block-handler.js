import TextBlockHandler from "./text-block-handler";

/**
 * Handler class responsible for handling events coming from the dispatcher and for sending updates to the rdflib-store when data is edited in the editor
 *
 * @class FetchBlockHandler
 * @extends TextBlockHandler
 * 
 */
class FetchBlockHandler extends TextBlockHandler {

    get scope() {
        return this.card;
    }

    isValidTerm(term) {
        return term === "me";
    }
    get card() {

        return "editor-plugins/say-solid-fetch-card";
    }

}

const single = FetchBlockHandler.create();
export default single; 