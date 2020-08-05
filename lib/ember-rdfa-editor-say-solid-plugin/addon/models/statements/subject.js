import { tracked } from '@glimmer/tracking';
import Node from './node';

export default class Subject extends Node {
    @tracked path = "";


    get name(){
        let patharr = this.path.value.split("#");
        return  patharr[patharr.length - 1];
    }
    constructor(path){
        this.path = path;
    }
}