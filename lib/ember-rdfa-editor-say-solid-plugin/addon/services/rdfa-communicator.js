import Service from '@ember/service';
import ForkableStore from 'solid-addon/utils/forking-store';
import rdflib from 'ember-rdflib';
import { inject as service } from '@ember/service';


const { Statement } = rdflib;

export default class RdfaCommunicatorService extends Service {
    @service("rdf-store") rdfStore;
    store = null;
    privateTypeIndex = null;
    publicTypeIndex = null;

    constructor(){
        super(...arguments);
        this.store = this.rdfStore.store;
    }

    getGraph(subject){
        //TODO get graph by type
        return subject.doc();
    }

    fromRDFa(rdfa, subject){
        rdfa.forEach(triple => {
            if(triple.subject === subject.value && triple.predicate !== "a"){
                const graph = this.getGraph(subject);
                const dels = this.store.match(subject, rdflib.sym(triple.predicate));
                const ins = [new Statement(subject, rdflib.sym(triple.predicate), rdflib.literal(triple.object), graph)];
                this.store.addAll(ins);
                this.store.removeStatements(dels);
                // this.store.persist();
            }
        });
    }

    toRDFa(){

    }
}
