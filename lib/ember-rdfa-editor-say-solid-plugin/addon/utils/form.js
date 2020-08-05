import { tracked } from '@glimmer/tracking';


export default class Form {
    id;
    @tracked errors = {};
    @tracked model = {};
    validators = {};

    constructor(id, model){
        this.id = id;
    }

    addValidator(propertyName, validatorFunc, errorMsg){
        if(this.validators[propertyName]){
            this.validators[propertyName].push({validatorFunc, errorMsg});
        } else {
            this.validators[propertyName] = [{validatorFunc, errorMsg}];
        }
    }
}