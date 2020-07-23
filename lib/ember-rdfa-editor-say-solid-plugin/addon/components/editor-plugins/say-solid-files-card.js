import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { LDP, RDF, SP } from 'solid-addon/utils/namespaces';
import File from '../../utils/file-managing/file';
import Folder from '../../utils/file-managing/folder';
import FilesBlockHandler from '../../utils/block-handlers/files-block-handler';

const { Fetcher, namedNode } = rdflib;

/**
 * Card displaying a tree of files in the Solid Pod
 *
 * @module editor-say-solid-plugin
 * @class SaySolidFilesCard
 * @extends Ember.Component
 */
export default class SaySolidFilesCard extends Component {

    @tracked selectedFile = null;
    @tracked selectedSubject = null;
    
    screens = {
        FILES: "files",
        SUBJECTS: "subjects",
        PREDICATES: "predicates"
    };

    @tracked currentScreen = this.screens.FILES;

    @action
    async onClose(rdfa) {
        FilesBlockHandler.handleClose(this.args.info, rdfa);
    }

    @action
    setSelectedFile(file){
        this.selectedFile = file;
    }

    @action
    setSelectedSubject(subject){
        this.selectedSubject = subject;
    }

    @action 
    openFile(){
        this.currentScreen = this.screens.SUBJECTS;
    }

    @action 
    openSubject(){
        this.currentScreen = this.screens.PREDICATES;
    }
}
