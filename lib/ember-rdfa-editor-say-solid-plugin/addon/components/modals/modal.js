import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { v4 as uuidv4 } from 'uuid';

/**
 * 
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
    @action
    save(){
    }
    
    @action
    addForm() {
        const uuidVal = uuidv4();
        this.forms = new Set([...this.forms, uuidVal]);
        return uuidVal;
        
    }


  }