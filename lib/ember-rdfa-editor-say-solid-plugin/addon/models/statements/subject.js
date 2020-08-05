import { tracked } from '@glimmer/tracking';
import Node from './node';

export default class Subject extends Node {
    get name(){
        let patharr = this.value.split("#");
        return  patharr[patharr.length - 1];
    }
}