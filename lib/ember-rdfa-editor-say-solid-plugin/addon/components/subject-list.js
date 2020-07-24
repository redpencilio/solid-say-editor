import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Subject from '../utils/file-managing/subject';

export default class SubjectListComponent extends Component {
  
  
    @tracked subjects;
    @service rdfaCommunicator;
    @service("solid-auth") auth;

    constructor() {
        super(...arguments);
        if(this.auth.webId){
            this.fetchSubjects();
        }
    }

    async fetchSubjects(){
        let result = await this.rdfaCommunicator.fetchSubjects(this.args.file);
        console.log(result);
        this.subjects = [...result].map(subject => new Subject(subject));
    }

    @action
    async login() {
        await this.auth.ensureLogin();
        await this.rdfaCommunicator.fetchTypeIndexes(this.auth.webId);
        await this.fetchSubjects();
    }

    get fileName(){
        let patharr = this.args.file.value.split("/");
        return  patharr[patharr.length - 1];
    }

    @action
    close(){
        this.args.onClose('');
    }
  }