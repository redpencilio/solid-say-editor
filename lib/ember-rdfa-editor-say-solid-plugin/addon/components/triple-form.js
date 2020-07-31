import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking'; 

export default class TripleFormComponent extends Component {
    @tracked predicateValue;
    @tracked objectValue; 
    objectTypes = ["Literal", "Resource"]; 
    chosenType = this.objectTypes[0]; 
    
    constructor(){
        super(...arguments); 
        let {uuid, model} = this.args; 
        this.uuid = uuid; 
        this.model = model; 
        if(model[uuid]){
            this.predicateValue =  model[uuid].predicate; 
            this.objectValue = mode[uuid].object; 
        }
    }

    @action
    updateModel(){
        let model = this.model[this.uuid] ; 
        model.predicate = this.predicateValue; 
        model.object = this.objectValue; 
    }

    @action
    chooseType(){
        this.chosenType = event.target.value; 
    }
}
