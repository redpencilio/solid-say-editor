import { tracked } from '@glimmer/tracking';

export default class Subject {
    @tracked path = "";


    get name(){
        let patharr = this.path.value.split("/");
        return  patharr[patharr.length - 1];
    }
    constructor(path){
        this.path = path;
    }
}