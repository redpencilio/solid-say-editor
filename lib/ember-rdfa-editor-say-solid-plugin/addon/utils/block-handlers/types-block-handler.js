import TextBlockHandler from "./text-block-handler";

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