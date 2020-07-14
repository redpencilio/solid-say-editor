import File from './file';

export default class Folder extends File {
    children = [];

    constructor(path, children){
        super(path);
        this.children = children;
    }

    addChild(file){
        this.children.push(file);
    }
}