import TextBlockHandler from "./text-block-handler";
/**
 * Handler class responsible for handling events coming from the dispatcher and for sending updates to the rdflib-store when data is edited in the editor
 *
 * @class FilesBlockHandler
 * @extends TextBlockHandler
 * 
 */
class FilesBlockHandler extends TextBlockHandler {

    get scope(){
        return this.card; 
    }

    isValidTerm(term){
        return term === "files"; 
    }
    get card(){

        return "editor-plugins/say-solid-files-card";
    }

}

const single = FilesBlockHandler.create(); 

export default  single ;