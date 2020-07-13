import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';

const { Fetcher, namedNode } = rdflib;

/**
 * Card displaying a hint of the Date plugin
 *
 * @module editor-say-solid-plugin
 * @class SaySolidCard
 * @extends Ember.Component
 */
export default class SaySolidCard extends Component {
  @service("rdf-store") store;

  async getProfileInfo(){
    const graph = this.store.store.graph;
    const me = graph.sym("https://jlpoelma.solid.community/profile/card#me");
    const fetcher = new Fetcher(graph);
    await fetcher.load(me);

    return this.store.create('solid/person', me, { defaultGraph: me.doc() });
  }

  @action
  async insert() {
    
    const info = this.args.info;
    info.hintsRegistry.removeHintsAtLocation( info.location, info.hrId, "say-solid-scope");
    const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
    const selection = info.editor.selectHighlight( mappedLocation );
    info.editor.update( selection, {
      set: { innerHTML: 'my <a href="https://say-editor.com">Say Editor</a> hint card' }
    });
  }
}
