import TextBlockHandler from "./text-block-handler";

/**
 * Handler class responsible for handling events coming from the dispatcher and for sending updates to the rdflib-store when data is edited in the editor
 *
 * @class LoginBlockHandler
 * @extends TextBlockHandler
 * 
 */
class LoginBlockHandler extends TextBlockHandler {

    get scope(){
        return this.card; 
    }

    isValidTerm(term){
        return term === "login"; 
    }
    get card(){

        return "editor-plugins/say-solid-login-card";
    }

}

const single = LoginBlockHandler.create(); 

export default  single ;