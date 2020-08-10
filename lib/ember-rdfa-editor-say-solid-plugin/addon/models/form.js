import { tracked } from '@glimmer/tracking';


export default class Form {
    id;
    @tracked errors = {};
    @tracked model = {};

    constructor(id, model){
        this.id = id;
        this.model = model;
    }
}