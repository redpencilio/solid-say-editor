import SolidBlockHandler from "./block-handler";


export default class LoginBlockHandler extends SolidBlockHandler {

    get scope(){
        return this.card; 
    }

    isValidBlock(term){
        return term === "login"; 
    }
    get card(){

        return "editor-plugins/say-solid-login-card";
    }

}