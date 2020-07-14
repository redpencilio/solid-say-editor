import SolidBlockHandler from "./block-handler";


export default class FetchBlockHandler extends SolidBlockHandler {

    get scope(){
        return this.card; 
    }

    isValidBlock(term){
        return term === "me"; 
    }
    get card(){

        return "editor-plugins/say-solid-fetch-card";
    }

}