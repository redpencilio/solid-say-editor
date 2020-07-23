import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';

const { Fetcher } = rdflib;

export default class ProfileService extends Service {
    @service("solid-auth") auth;
    @service("rdf-store") store;
    @service rdfaCommunicator;
    @tracked madeChanges = false;

    @tracked me = null;

    async fetchProfileInfo(){
        const graph = this.store.store.graph;
        const me = graph.sym(this.auth.webId);
        const fetcher = new Fetcher(graph);
        await fetcher.load(me);
        this.me =  me; 
    }



}
