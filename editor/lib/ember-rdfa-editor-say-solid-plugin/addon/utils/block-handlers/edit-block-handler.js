import SolidHandler from "./block-handler"; 
import { inject as service } from '@ember/service';


class EditBlockHandler extends SolidHandler {

    @service profile; 


    get scope(){
        return "editor-plugins/say-solid-edit-card";
    }

    isValidBlock(term){
        return term === "me"; 
    }

    get card(){
        return this.scope; 
    }



}

const single = new EditBlockHandler(); 

export default single; 
