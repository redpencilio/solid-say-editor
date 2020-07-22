import Service from '@ember/service';
import ForkableStore from 'solid-addon/utils/forking-store';
import rdflib from 'ember-rdflib';
import { inject as service } from '@ember/service';
import { RDF, SOLID } from 'solid-addon/utils/namespaces';

const { Statement } = rdflib;

export default class RdfaCommunicatorService extends Service {
    @service("rdf-store") rdfStore;
    @service profile;
    store = null;
    privateTypeIndex = null;
    publicTypeIndex = null;

    constructor(){
        super(...arguments);
        this.store = this.rdfStore.store;
    }

    

    getGraphByType(type, typeIndex){
        // Search for type registration in typeIndex
        if(typeIndex){
            const subject = this.store.any(undefined, SOLID("forClass"), type, typeIndex).subject;
            if(subject){
                return this.store.any(subject, SOLID("instance"), undefined, typeIndex).object;
            }
        }
        return false;
    }

    getType(subject, rdfa){
        rdfa.find(triple => {
            return triple.subject === subject.value && triple.predicate === "a";
        }).object;
    }

    getGraph(subject, type){
        return this.getGraphByType(type, this.publicTypeIndex) || this.getGraphByType(type, this.privateTypeIndex) || subject.doc();
    }

    fromRDFa(rdfa, subject){
        rdfa.forEach(triple => {
            const graph = this.getGraph(subject, rdflib.sym(this.getType(subject, rdfa)));
            if(triple.subject === subject.value && triple.predicate !== "a"){
                console.log(triple.object);
                const dels = this.store.match(subject, rdflib.sym(triple.predicate), undefined, graph);
                const ins = [new Statement(subject, rdflib.sym(triple.predicate), rdflib.literal(triple.object.trim()), graph)];
                if(!dels || dels[0].object.value.trim() !== triple.object.trim()){
                    this.profile.madeChanges = true;
                    this.store.addAll(ins);
                    this.store.removeStatements(dels);
                }
            }
        });
    }

    toRDFa(){

    }

    persist(){
        this.store.persist();
    }

    fetchTypeIndexes(webId){
        const me = rdflib.sym(webId);
        await this.store.load( me.doc() );
        this.privateTypeIndex = this.store.any( me, SOLID("privateTypeIndex"), undefined, me.doc() );
        this.publicTypeIndex = this.store.any( me, SOLID("publicTypeIndex"), undefined, me.doc() );
        await this.store.load( privateTypeIndex );
        await this.store.load( publicTypeIndex );
    }
}
