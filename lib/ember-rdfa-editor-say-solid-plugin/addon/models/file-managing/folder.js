import { tracked } from '@glimmer/tracking';
import File from './file';

export default class Folder extends File {
    @tracked children = [];
    @tracked isLoading = false;
    @tracked hasLoaded = false;

    /**
     * A Folder is a type of File that contains other files. 
     * 
     * @constructor Folder
     * @extends File
     * @property {EmberArray<File>} children  list of child files.
     * @property {bool} isLoading indicates if the folder is in the process of loading. 
     * @property {bool} hasLoaded indicates if the folder has already been loaded. 
     * @param {NamedNode} path NamedNode containing the path of the folder.
     * @param {EmberArray<File>} children list of child files.
     */
    constructor(path, children) {
        super(path);
        this.children = children;
    }

    /**
     * @inheritdoc
     */
    get type() {
        return "folder";
    }


    /**
     * 
     * @param {File} file a File to be added to the Folder
     */
    addFile(file) {
        this.children.pushObject(file);
    }
}