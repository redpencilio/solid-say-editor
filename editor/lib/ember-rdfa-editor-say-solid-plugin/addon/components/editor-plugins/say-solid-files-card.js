import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import SolidPersonModel from '../../models/solid/person';
import { VCARD, FOAF, LDP, SP, SOLID } from 'solid-addon/utils/namespaces';
import FilesBlockHandler from '../../utils/block-handlers/files-block-handler';

const { Fetcher, namedNode } = rdflib;

/**
 * Card displaying a hint of the Date plugin
 *
 * @module editor-say-solid-plugin
 * @class SaySolidCard
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
          this.getFiles();
      }
  }

  async getFiles(){
    const graph = this.store.store.graph;
    if(this.profile.me === null){
        this.profile.fetchProfileInfo();
    }
    await fetcher.load(this.profile.me.storage);
    let files = this.store.match(person.storage, LDP('contains'));
    console.log(files);
    this.files = files;
  }

  @action
  async login() {
    await this.auth.ensureLogin();
    await this.auth.ensureTypeIndex();
    await this.getFiles();
  }

  @action
  async close(){
    FilesBlockHandler.handleClose(this.args.info, '');
  }
}
