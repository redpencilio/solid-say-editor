import SolidBlockHandler from "./block-handler";


class FetchBlockHandler extends SolidBlockHandler {

    get scope() {
        return this.card;
    }

    isValidBlock(term) {
        return term === "me";
    }
    get card() {

        return "editor-plugins/say-solid-fetch-card";
    }

}

const single = FetchBlockHandler.create();
export default single; 