import { tracked } from '@glimmer/tracking';




export default class File {

    @tracked node;


    /**
     * A model to emulate file structure. 
     * @constructor File
     * @property {NamedNode} node NamedNode containing the value of the file path.
     * @param {NamedNode} node  NamedNode containing the value of the file path.
     */
    constructor(node) {

        this.node = node;
    }

    /**
     * 
     * Returns the type of the file. 
     * @public
     * @readonly
     * @instance
     * @memberof File
     * @returns {String} "file" string to state the type
     */
    get type() {
        return "file";
    }

    /**
     * Returns the URI path of the file
     * @public 
     * @readonly
     * @instance
     * @memberof File
     * @returns {String} URI path of the file 
     */
    get name() {
        let patharr = this.node.value.split("/");
        return patharr[patharr.length - 1] || patharr[patharr.length - 2];
    }

}