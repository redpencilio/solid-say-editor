import { tracked } from '@glimmer/tracking';

/**
 * Represents the file model which will be used in the file listing. 
 */
export default class File {
    @tracked node;

    get type() {
        return "file";
    }

    get name() {
        let patharr = this.node.value.split("/");
        return patharr[patharr.length - 1] || patharr[patharr.length - 2];
    }
    constructor(node) {
        this.node = node;
    }
}