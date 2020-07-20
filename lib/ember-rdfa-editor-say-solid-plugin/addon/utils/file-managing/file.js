import { tracked } from '@glimmer/tracking';

export default class File {
    @tracked path = "";
    
    get type(){
        return "file";
    }

    get name(){
        let patharr = this.path.split("/");
        return  patharr[patharr.length - 1] || patharr[patharr.length - 2];
    }
    constructor(path){
        this.path = path;
    }
}