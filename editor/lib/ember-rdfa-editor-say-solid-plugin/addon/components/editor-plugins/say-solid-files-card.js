import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import SolidPersonModel from '../../models/solid/person';
import { VCARD, FOAF, LDP, SP, SOLID } from 'solid-addon/utils/namespaces';
import Folder from '../../utils/file-managing/folder';
import File from '../../utils/file-managing/file';
const { Fetcher, namedNode } = rdflib;

/**
 * Card displaying a tree of files in the Solid Pod
 *
 * @module editor-say-solid-plugin
 * @class SaySolidFilesCard
 * @extends Ember.Component
 */
export default class SaySolidFilesCard extends Component {
  @service  auth;
  @service("rdf-store") store;
  @service profile;
  @tracked files = [];

  constructor(){
      super(...arguments);
      if(this.auth.webId){
          this.fetchFiles();
      }
  }

  async fetchFiles(){
    const graph = this.store.store.graph;
    if(this.profile.me === null){
        await this.profile.fetchProfileInfo();
    }
    const fetcher = new Fetcher(graph);
    this.files = await this.getFiles(this.profile.me.storage, fetcher);
    console.log(this.files);
  }

  async getFiles(folder, fetcher){
    let result = [];
    console.log(folder);
    await fetcher.load(folder);
    let files = this.store.match(folder, LDP('contains'));
    if(files === undefined){
        return [];
    }
    files.forEach(async (file) => {
        let children = await this.getFiles(file.object, fetcher);
        if (children !== []){
            let folderObj = new Folder(file.object.value, children);
            result.push(folderObj);
        } else {
            let fileObj = new File(file.object.value);
            result.push(fileObj);
        }
    })
    return result;
  }

  @action
  async login() {
    await this.auth.ensureLogin();
    await this.auth.ensureTypeIndex();
    await this.fetchFiles();
  }

  @action
  async close(){
    const info = this.args.info;
    info.hintsRegistry.removeHintsAtLocation( info.location, info.hrId, "say-solid-scope");
    const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
    const selection = info.editor.selectHighlight( mappedLocation );
    info.editor.update( selection, {
      set: { innerHTML: '' }
    });
  }
}
