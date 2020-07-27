import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Subject from '../utils/file-managing/subject';

export default class SubjectListComponent extends Component {
  
  
    @tracked subjects;
    @service rdfaCommunicator;
    @service("solid-auth") auth;
    @service profile;

    async fetchSubjects(){
        let result = await this.rdfaCommunicator.fetchSubjectsByGraph(this.args.file);
        this.subjects = [...result].map(subject => new Subject(subject));
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