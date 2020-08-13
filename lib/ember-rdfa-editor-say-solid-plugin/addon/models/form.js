import { tracked } from '@glimmer/tracking';


export default class Form {
    id;
    @tracked errors = {};
    @tracked model = {};

    /**
     * Represents the different forms used in the different modal components to 
     * add new data to the store.   
     * @constructor Form
     * @property {Object} errors a map containing the errors for a particular form field. 
     * @property {Object} model the data object for which the form will be manipulating
     * @property {String} id UUID of the form
     * @param {String} id UUID of the form.
     * @param {Object} model the data object for which the form will be manipulating.
     */
    constructor(id, model) {
        this.id = id;
        this.model = model;
    }
}