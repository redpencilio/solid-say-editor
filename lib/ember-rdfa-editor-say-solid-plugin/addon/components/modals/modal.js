import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { v4 as uuidv4 } from 'uuid';
import Form from '../../utils/form';

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

    constructor(){
        super(...arguments);
        this.addForm();
    }

    // Save-function that is run when the user clicks on "save"
    @action
    save(){
        // Check for remaining errors
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
        let validators = this.forms[uuid].validators[propertyName];
        let value = this.forms[uuid].model[propertyName];
        if(validators){
            let errors = {};
            validators.forEach(({validatorFunc, errorMsg}) => {
                if(!validatorFunc(value)){
                    errors[propertyName] = errorMsg;
                }
            })
            this.forms[uuid].errors[propertyName] = errors;
        }
    }

    @action
    handleChange(uuid, propertyName){
        // check for errors
        this.validate(uuid, propertyName);
    }


  }