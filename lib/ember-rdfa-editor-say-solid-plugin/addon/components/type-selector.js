import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Subject from '../utils/file-managing/subject';

export default class TypeSelectorComponent extends Component {
  
  
    @tracked types;
    @service rdfaCommunicator;
    @service("solid-auth") auth;
    @service profile;

    constructor() {
        super(...arguments);
        if(this.auth.webId){
            this.fetchTypes();
        }
    }

    async fetchTypes(){
        let result = await this.rdfaCommunicator.fetchTypes();
        this.types = result;
    }

    @action
    async login() {
        await this.auth.ensureLogin();
        await this.rdfaCommunicator.fetchTypeIndexes(this.auth.webId);
        await this.profile.fetchProfileInfo();
        await this.fetchTypes();
    }

    @action
    close(){
        this.args.onClose('');
    }
  }