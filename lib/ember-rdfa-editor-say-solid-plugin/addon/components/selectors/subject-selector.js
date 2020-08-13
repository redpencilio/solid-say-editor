import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

/**
 * Component responsible for rendering a list of selectable subjects and for fetching subjects from a store for a specific file/graph
 *
 * @class SubjectSelectorComponent
 * @extends Ember.Component
 * @property {ModelStoreCommunicatorService} storeCommunicator Ember service used to communicate with the forking store
 * @property {ProfileService} profile Ember service used to log in and fetch profile info
 * @property {Boolean} popup Boolean that indicates whether a subject-creation popup is shown
 * @property {NamedNode[]} subjects List of subjects shown in the subject selector
 * @property {Boolean} isLoading Whether the subjects are being fetched
 */
export default class SubjectSelectorComponent extends Component {


    @tracked subjects;
    @service("model/store-communicator") storeCommunicator;
    @service profile;
    @tracked popup = false;
    @tracked isLoading = false;

    /**
     * Fetches a list of subjects for the given file/graph
     *
     * @method fetchSubjects
     *
     * @memberof SubjectSelectorComponent
     * @public
    */
    @action
    async fetchSubjects() {
        this.isLoading = true;
        let result = await this.storeCommunicator.fetchSubjectsByGraph(this.args.file);
        this.subjects = [...result];
        this.isLoading = false;
    }

    /**
     * Extracts the file-name from a file-path
     *
     * @method fileName
     *
     *  @returns {string} fileName
     *  @memberof SubjectSelectorComponent
     * @public
    */
    get fileName() {
        let patharr = this.args.file.value.split("/");
        return patharr[patharr.length - 1];
    }

    /**
     * Called when the card is being closed
     *
     * @method close
     *
     *  @memberof SubjectSelectorComponent
     * @public
    */
    @action
    close() {
        this.args.onClose('');
    }


    /**
     * Adds a newly create subject to the subjects list
     *
     * @method addSubject
     *
     * @param {NamedNode} subject The file to be added
     * @param {NamedNode} type The type of the subject
     * 
     * @memberof SubjectSelectorComponent
     * 
     * @public
    */
    @action
    addSubject(subject, type){
        this.subjects.pushObject(subject);
        // this.subjects = [...this.subjects, subject];
    }
}