import TextBlockHandler from "./text-block-handler";


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