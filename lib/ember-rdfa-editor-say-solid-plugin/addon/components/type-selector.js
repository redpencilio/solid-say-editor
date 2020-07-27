import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Subject from '../utils/file-managing/subject';

export default class TypeSelectorComponent extends Component {
  
  
    @tracked types;
    @service rdfaCommunicator;
    @service profile;
    @action
    async fetchTypes(){
        let result = await this.rdfaCommunicator.fetchTypes();
        this.types = result;
    }

    @action
    close(){
        this.args.onClose('');
    }
  }