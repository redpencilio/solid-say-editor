import SolidBlockHandler from "./block-handler";


class LoginBlockHandler extends SolidBlockHandler {

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

const single = LoginBlockHandler.create(); 

export default  single ;