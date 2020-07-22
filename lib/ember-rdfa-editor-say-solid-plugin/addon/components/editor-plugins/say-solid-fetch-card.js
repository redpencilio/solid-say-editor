import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import SolidPersonModel from '../../models/solid/person';
import FetchBlockHandler from '../../utils/block-handlers/fetch-block-handler';
import {RDF} from 'solid-addon/utils/namespaces';

const { Fetcher, namedNode } = rdflib;

/**
 * Card displaying a hint of the Date plugin
 *
 * @module editor-say-solid-plugin
 * @class SaySolidCard
 * @extends Ember.Component
 */
export default class SaySolidFetchCard extends Component {
  @service("solid-auth")  auth;
  @service("rdf-store") store;
  @service profile;
  checkedAttributes = new Set();

  constructor(){
    super(...arguments);
    if(this.auth.webId){
      this.profile.fetchProfileInfo();
    }
  }

  @action
  async insert() {
    await this.profile.fetchProfileInfo();
    let rdfa = this.profile.me.toRDFa(this.checkedAttributes);
    FetchBlockHandler.handleClose(this.args.info, rdfa);
  }

  @action
  onSelect(pred){
    if(this.checkedAttributes.has(pred)){
      this.checkedAttributes.delete(pred);
    } else {
      this.checkedAttributes.add(pred);
    }
  }

  @action
  async login(){
    await this.auth.ensureLogin();
    await this.auth.ensureTypeIndex();
    await this.profile.fetchProfileInfo();
  }
}
