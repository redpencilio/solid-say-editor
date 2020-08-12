import TextBlockHandler from "./text-block-handler";
/**
 * Handler class responsible for handling events coming from the dispatcher and for sending updates to the rdflib-store when data is edited in the editor
 *
 * @class TypesBlockHandler
 * @extends TextBlockHandler
 * 
 */
class TypesBlockHandler extends TextBlockHandler {

    get scope(){
        return this.card; 
    }

    isValidTerm(term){
        return term === "types"; 
    }
    get card(){

        return "editor-plugins/say-solid-types-card";
    }

}

const single = TypesBlockHandler.create(); 

export default  single ;