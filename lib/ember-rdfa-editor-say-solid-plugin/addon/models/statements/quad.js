import { tracked } from "@glimmer/tracking";
import {action} from "@ember/object"; 

export default class Quad {
    @tracked
    subject = undefined; 
    @tracked
    predicate = undefined; 
    @tracked
    object = undefined; 


    @action
    toRDFa(){
    }


    @action
    fromRDFa(){
        
    }
    
}