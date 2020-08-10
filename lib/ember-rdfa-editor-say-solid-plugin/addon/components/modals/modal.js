import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { v4 as uuidv4 } from 'uuid';
import Form from '../../models/form';

/**
 * 
 * Superclass responsible for rendering a modal
 * 
 * @module editor-say-solid-plugin
 * @class ModalComponent
 * @extends Ember.Component
 */
export default class ModalComponent extends Component {
    @tracked forms = {};
    @tracked errorCount = 0; 
    @tracked validators = {};
    constructor(){
        super(...arguments);
        this.initValidators();
        this.addForm();
    }

    initValidators(){
        throw new Error("Not implemented");
    }

    // Save-function that is run when the user clicks on "save"
    @action
    save(){
        throw new Error("Not implemented");
    }
    
    // Adds a form to the Modal, each form has a unique ID
    @action
    addForm() {
        const uuidVal = uuidv4();
        let form = new Form(uuidVal);
        this.forms = {...this.forms, [uuidVal]: form};
        return form;
        
    }

    validate(uuid, propertyName){
        console.log("validate");
        let validators = this.validators[propertyName];
        let value = this.forms[uuid].model[propertyName];
        if(validators){
            let error = "";
            if(this.forms[uuid].errors[propertyName]) {
                this.errorCount -= 1; 
            }

            for (let i = 0; i < validators.length; i++) {
                const {validatorFunc, errorMsg} = validators[i];
                if(!validatorFunc(value)){
                    error = errorMsg;
                    this.errorCount += 1; 
                    break;
                }
            }
            this.forms[uuid].errors = { ...this.forms[uuid].errors, [propertyName]: error};
            console.log(this.errorCount);
        }
    }

    @action
    handleChange(uuid, propertyName){
        // check for errors
        this.validate(uuid, propertyName);
    }

    addValidator(propertyName, validatorFunc, errorMsg){
        if(this.validators[propertyName]){
            this.validators[propertyName].push({validatorFunc, errorMsg});
        } else {
            this.validators[propertyName] = [{validatorFunc, errorMsg}];
        }
    }


  }