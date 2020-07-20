import TextBlockHandler from "./text-block-handler";


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