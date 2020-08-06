import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object"; 
export default class Node {
    @tracked 
    value = undefined; 
    @tracked 
    type = undefined; 
    @tracked
    metadata = undefined;

    constructor(value, type, metadata){
        this.value = value;
        this.type = type;
        this.metadata = metadata;
    }

    @action
    toRDFa(){

    }

    @action 
    fromRDFa(){
        
    }
}