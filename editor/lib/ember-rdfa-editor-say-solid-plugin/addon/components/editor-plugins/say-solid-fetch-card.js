import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import SolidPersonModel from '../../models/solid/person';
import FetchBlockHandler from '../../utils/block-handlers/fetch-block-handler';


const { Fetcher, namedNode } = rdflib;

/**
 * Card displaying a hint of the Date plugin
 *
 * @module editor-say-solid-plugin
 * @class SaySolidCard
 * @extends Ember.Component
 */
export default class SaySolidFetchCard extends Component {
  @service  auth;
  @service("rdf-store") store;
  @service profile;

  @action
  async insert() {
    await this.profile.fetchProfileInfo();
    FetchBlockHandler.handleClose(this.args.info, `<a href=${this.auth.webId} property="foaf:name">${this.profile.me.name}</a>`)
  }

  @action
  async login(){
    await this.auth.ensureLogin();
    await this.auth.ensureTypeIndex();
  }
}
