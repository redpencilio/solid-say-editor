import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import { LDP, RDF, SP } from 'solid-addon/utils/namespaces';
import File from '../utils/file-managing/file';
import Folder from '../utils/file-managing/folder';

/**
 * Component responsible for rendering a file-tree and fetching the files and folders found in a user's solid storage.
 *
 * @module editor-say-solid-plugin
 * @class FileListComponent
 * @extends Ember.Component
 */
export default class FileSelectorComponent extends Component {
  
    @service rdfaCommunicator;
    @service profile;
    @tracked files;
    @tracked isLoading = false;

    
    /**
   * Fetches a list of file and folders from a Solid-pod
   *
   * @method fetchFiles
   *
   * @public
   */
    @action
    async fetchFiles() {
        this.isLoading = true;
        if (this.profile.me === null) {
            await this.profile.fetchProfileInfo();
        }
        const storage = this.rdfaCommunicator.store.any(this.profile.me, SP("storage"));
        this.files = await this.getFiles(storage, this.rdfaCommunicator.store.fetcher);
        this.isLoading = false;
    }

    /**
     * Fetches a list of files found in a specific folder from a Solid-pod
     *
     * @method getFiles
     *
     * @param {NamedNode} folder The given folder
     * @param {Fetcher} fetcher rdflib.js-fetcher
     * @public
     */
    async getFiles(folder, fetcher) {
        let result = [];
        await fetcher.load(folder);
        let files = this.rdfaCommunicator.store.match(folder, LDP('contains'));
        if (files === undefined) {
            return [];
        }
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            const isFolder = this.rdfaCommunicator.store.match(file.object, RDF("type"), LDP("Container"));
            let children = await this.getFiles(file.object, fetcher);
            if (isFolder.length > 0) {
                let folderObj = new Folder(file.object, children);
                result.push(folderObj);
            } else {
                let fileObj = new File(file.object);
                result.push(fileObj);
            }
        }
        return result;
    }

    /**
     * Inserts a rdf:seeAlso-link to a specific file in the editor
     *
     * @method insertSelectedFile
     *
     * @public
     */
    @action
    insertSelectedFile(){
        const html = `<a href="${this.selectedFile.path}" property="rdf:seeAlso">${this.selectedFile.name}</a>`;
        this.args.onClose(html);
    }

    @action
    close(){
        this.args.onClose('');
    }
  }