import File from './file';
import { tracked } from '@glimmer/tracking';

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
}