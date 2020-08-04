import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { v4 as uuidv4 } from 'uuid';

/**
 * 
 * Superclass responsible for rendering a modal
 * 
 * @module editor-say-solid-plugin
 * @class ModalComponent
 * @extends Ember.Component
 */
export default class ModalComponent extends Component {
    @tracked forms = new Set();
    @tracked items = {};

    constructor(){
        super(...arguments);
        this.addForm();
    }

    // Save-function that is run when the user clicks on "save"
    @action
    save(){
    }
    
    // Adds a form to the Modal, each form has a unique ID
    @action
    addForm() {
        const uuidVal = uuidv4();
        this.forms = new Set([...this.forms, uuidVal]);
        return uuidVal;
        this.subjects[uuidVal] = {subject: "", type: ""};
        
    }


  }