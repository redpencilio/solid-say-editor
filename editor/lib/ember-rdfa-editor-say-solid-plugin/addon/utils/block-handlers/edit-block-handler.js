import SolidHandler from "./block-handler"; 


class EditBlockHandler extends SolidHandler {

    get scope(){
        return "editor-plugins/say-solid-edit-card";
    }

    isValidBlock(term){
        throw "Not Applicable"; 
    }

    get regex(){
        throw "Not Applicable"; 
    }

    get card(){
        return this.scope; 
    }


    handle(hrid, block, hintsRegistry, editor){
        
        
        
    }




}

const single = new EditBlockHandler(); 

export default single; 
