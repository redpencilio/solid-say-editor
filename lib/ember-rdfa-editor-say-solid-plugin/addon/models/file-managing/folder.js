import { tracked } from '@glimmer/tracking';
import File from './file';

/**
 * Folder containing a list of files. 
 */
export default class Folder extends File {
    @tracked children = [];
    @tracked isLoading = false;
    @tracked hasLoaded = false;

    get type() {
        return "folder";
    }

    constructor(path, children) {
        super(path);
        this.children = children;
    }

    addFile(file) {
        this.children.pushObject(file);
    }
}