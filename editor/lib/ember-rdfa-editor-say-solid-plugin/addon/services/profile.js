import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';

const { Fetcher, namedNode } = rdflib;

export default class ProfileService extends Service {
    @service auth;
    @service("rdf-store") store;
    @tracked madeChanges = false;

    @tracked me = null;

    async fetchProfileInfo(){
        const graph = this.store.store.graph;
        const me = graph.sym(this.auth.webId);
        const fetcher = new Fetcher(graph);
        await fetcher.load(me);
        this.me = this.store.create('solid/person', me, { defaultGraph: me.doc() } ); 
    }

    async sendProfileInfo(){
        await this.store.persist();
    }



}
