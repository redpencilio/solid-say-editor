import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object"; 
export default class Node {
    @tracked 
    value = undefined; 
    @tracked 
    termType = undefined; 
    @tracked
    metadata = undefined;

    constructor(value, termType, metadata){
        this.value = value;
        this.termType = termType;
        this.metadata = metadata;
    }

    @action
    toRDFa(){

    }

    @action 
    fromRDFa(){
        
    }
}