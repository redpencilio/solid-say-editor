import File from './file';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
export default class Folder extends File {
    @tracked children = [];
    @tracked isLoading = false;
    @tracked hasLoaded = false;
    
    get type(){
        return "folder";
    }

    constructor(path, children){
        super(path);
        this.children = children;
    }

    addFile(file){
        this.children = [...this.children, file];
    }
}