import TextBlockHandler from "./text-block-handler";

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