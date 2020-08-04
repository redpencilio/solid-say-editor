import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FileFormComponent extends Component {
    
    @tracked errors = {};

    validateForm(){
        console.log("validation");
        let errors = {};
        if(!this.args.model["file"]){
            errors["file"] = "Filename may not be empty";
        }
        if(!this.args.model["file"].match(/^[a-zA-Z0-9]*$/)){
            errors["file"] = "Filename may not contain spaces or special characters";
        }
        this.errors = errors;
    }

    @action
    onChange(field){
        this.args.model[field] = event.target.value;
        this.validateForm();
    }
    
}
