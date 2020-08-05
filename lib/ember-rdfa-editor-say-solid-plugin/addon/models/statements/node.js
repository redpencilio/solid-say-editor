import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object"; 
export default class Node {
    @tracked 
    value = undefined; 
    @tracked 
    type = undefined; 

    constructor(value){
        this.value = value;
    }

    @action
    toRDFa(){

    }

    @action 
    fromRDFa(){
        
    }
}