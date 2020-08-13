import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import FilesBlockHandler from '../../utils/block-handlers/files-block-handler';

/**
 * Card responsible for the fetching of subjects and predicates of specific files
 * This card consists of three different screens: a file-selection screen, a subject-selection screen and a predicate-selection screen
 *
 * @class SaySolidFilesCard
 * @extends Ember.Component
 * 
 * @property {File} selectedFile currently selected file/folder
 * @property {NamedNode} selectedGraph currently selected graph 
 * @property {NamedNode} selectedSubject currently selected subject
 * @property {Object} screens  enums to indicate the current type of card to be shown
 * @property {String} screens.FILES  files info card
 * @property {String} screens.SUBJECTS subject info card 
 * @property {String} screens.PREDICATES predicate info card
 */
export default class SaySolidFilesCard extends Component {
    // file selected on the file-tree screen
    @tracked selectedFile = null;
    @tracked selectedGraph = null;

    // subject selected on the subject-selection screen
    @tracked selectedSubject = null;

    // screens that are shown on this card
    screens = {
        FILES: "files",
        SUBJECTS: "subjects",
        PREDICATES: "predicates"
    };

    // current shown screen
    @tracked currentScreen = this.screens.FILES;

    /**
     * Handles the closing of the card.     
     * @memberof SaySolidFilesCard
     * @param {String} rdfa html tags to be inserted upon closing the cards
     */
    @action
    async onClose(rdfa) {
        FilesBlockHandler.handleClose(this.args.info, rdfa);
    }

    /**
     * Setter for selecting the current file. 
     * @memberof SaySolidFilesCard
     * @param {File} file the folder/file to be selected
     */
    @action
    setSelectedFile(file) {
        this.selectedFile = file;
        this.selectedGraph = file.node;
    }
}
