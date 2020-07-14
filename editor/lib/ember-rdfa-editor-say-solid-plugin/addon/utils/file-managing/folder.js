import File from './file';
import { tracked } from '@glimmer/tracking';

export default class Folder extends File {
    @tracked children = [];
    
    get type(){
        return "folder";
    }

    constructor(path, children){
        super(path);
        this.children = children;
    }

    addChild(file){
        this.children.push(file);
    }
}