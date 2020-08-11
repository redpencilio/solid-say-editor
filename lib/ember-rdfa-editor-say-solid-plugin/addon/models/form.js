import { tracked } from '@glimmer/tracking';


/**
 * Represents the different forms used in the different modal components to 
 * add new data to the store. 
 */
export default class Form {
    id;
    @tracked errors = {};
    @tracked model = {};

    constructor(id, model) {
        this.id = id;
        this.model = model;
    }
}