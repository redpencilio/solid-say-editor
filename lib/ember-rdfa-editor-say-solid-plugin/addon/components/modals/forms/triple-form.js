import Component from '@glimmer/component';
import {action} from '@ember/object'; 
import {tracked} from '@glimmer/tracking'; 

export default class TripleFormComponent extends Component {
    objectTypes = ["Literal", "Resource"]; 
    
    constructor(){
        super(...arguments); 
        this.args.form.model.objType = this.objectTypes[0]; 
    }

    @action
    chooseType(){
        console.log(event.target.dataset);
        this.args.form.model.objType = event.target.value; 
    }
}
