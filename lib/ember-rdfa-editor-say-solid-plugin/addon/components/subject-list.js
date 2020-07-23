import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Subject from '../utils/file-managing/subject';

export default class SubjectListComponent extends Component {
  
  
    @tracked subjects;
    @service rdfaCommunicator;

    constructor() {
        super(...arguments);
        this.fetchSubjects();
    }

    async fetchSubjects(){
        let result = await this.rdfaCommunicator.fetchSubjects(this.args.file);
        console.log(result);
        this.subjects = [...result].map(subject => new Subject(subject));
    }
  }