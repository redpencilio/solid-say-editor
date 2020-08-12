import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import FilesBlockHandler from '../../utils/block-handlers/files-block-handler';
/**
 * @module components/editor-plugins
 */
/**
 * Card responsible for the fetching of subjects and predicates of specific files
 * This card consists of three different screens: a file-selection screen, a subject-selection screen and a predicate-selection screen
 *
 * @class SaySolidFilesCard
 * @extends Ember.Component
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

    @action
    async onClose(rdfa) {
        FilesBlockHandler.handleClose(this.args.info, rdfa);
    }

    @action
    setSelectedFile(file){
        this.selectedFile = file;
        this.selectedGraph = file.node;
    }
}
