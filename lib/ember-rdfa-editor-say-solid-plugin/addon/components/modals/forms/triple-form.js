import Component from '@glimmer/component';
import {action} from '@ember/object'; 
import {tracked} from '@glimmer/tracking'; 

export default class TripleFormComponent extends Component {
    objectTypes = ["Literal", "Resource"]; 
    
    constructor(){
        super(...arguments); 
        this.args.model.objType = this.objectTypes[0]; 
    }

    @action
    chooseType(){
        this.args.model.objType = event.target.value; 
    }
}
