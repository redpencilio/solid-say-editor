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

  async getProfileInfo(){
    const graph = this.store.store.graph;
    const me = graph.sym(this.auth.webId);
    const fetcher = new Fetcher(graph);
    await fetcher.load(me);
    return this.store.create('solid/person', me, { defaultGraph: me.doc() } );
  }

  @action
  async insert() {
    const me = await this.getProfileInfo();
    FetchBlockHandler.handleClose(this.args.info, `<a href=${this.auth.webId} property="foaf:name">${me.name}</a>`)
  }

  @action
  async login(){
    await this.auth.ensureLogin();
    await this.auth.ensureTypeIndex();
  }
}
