import SolidBlockHandler from "./block-handler";


class FilesBlockHandler extends SolidBlockHandler {

    get scope(){
        return this.card; 
    }

    isValidBlock(term){
        return term === "files"; 
    }
    get card(){

        return "editor-plugins/say-solid-files-card";
    }

}

const single = FilesBlockHandler.create(); 

export default  single ;