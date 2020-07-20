import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { LDP, RDF } from 'solid-addon/utils/namespaces';
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
    @service auth;
    @service("rdf-store") store;
    @service profile;

    @tracked files;

    @tracked isLoading = false;

    @tracked selectedFile = null;

    constructor() {
        super(...arguments);
        if (this.auth.webId) {
            this.fetchFiles();
        }
    }

    @action
    async fetchFiles() {
        this.isLoading = true;
        const graph = this.store.store.graph;
        if (this.profile.me === null) {
            await this.profile.fetchProfileInfo();
        }
        const fetcher = new Fetcher(graph);
        this.files = await this.getFiles(this.profile.me.storage, fetcher);
        this.isLoading = false;
    }

    async getFiles(folder, fetcher) {
        let result = [];
        await fetcher.load(folder);
        let files = this.store.match(folder, LDP('contains'));
        if (files === undefined) {
            return [];
        }
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            const isFolder = this.store.match(file.object, RDF("type"), LDP("Container"));
            let children = await this.getFiles(file.object, fetcher);
            if (isFolder.length > 0) {
                let folderObj = new Folder(file.object.value, children);
                result.push(folderObj);
            } else {
                let fileObj = new File(file.object.value);
                result.push(fileObj);
            }
        }
        return result;
    }

    @action
    async login() {
        await this.auth.ensureLogin();
        await this.auth.ensureTypeIndex();
        await this.fetchFiles();
    }

    @action
    async close() {
        FilesBlockHandler.handleClose(this.args.info, '');
    }

    @action
    insertSelectedFile(){
        const html = `<a href="${this.selectedFile.path}" property="rdf:seeAlso">${this.selectedFile.name}</a>`;
        FilesBlockHandler.handleClose(this.args.info, html);
    }

    @action
    setSelectedFile(file){
        console.log("set");
        this.selectedFile = file;
    }
}
