import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Subject from '../../utils/file-managing/subject';

/**
 * Component responsible for rendering a list of selectable subjects and for fetching subjects from a store for a specific file/graph
 *
 * @module editor-say-solid-plugin
 * @class SubjectSelectorComponent
 * @extends Ember.Component
 */
export default class SubjectSelectorComponent extends Component {


    @tracked subjects;
    @service rdfaCommunicator;
    @service profile;

    /**
     * Fetches a list of subjects for the given file/graph
     *
     * @method fetchSubjects
     *
     * @public
    */
    @action
    async fetchSubjects() {
        let result = await this.rdfaCommunicator.fetchSubjectsByGraph(this.args.file);
        this.subjects = [...result].map(subject => new Subject(subject));
    }

    /**
     * Extracts the file-name from a file-path
     *
     * @method fileName
     *
     *  @returns {string} fileName
     * @public
    */
    get fileName() {
        let patharr = this.args.file.value.split("/");
        return patharr[patharr.length - 1];
    }

    @action
    close() {
        this.args.onClose('');
    }
}