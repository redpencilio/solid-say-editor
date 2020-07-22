import Service from '@ember/service';
import ForkableStore from 'solid-addon/utils/forking-store';
import rdflib from 'ember-rdflib';

const { Statement } = rdflib;

export default class RdfaCommunicatorService extends Service {
    store = null;
    privateTypeIndex = null;
    publicTypeIndex = null;

    constructor(){
        super(...arguments);
        this.store = new ForkableStore();
    }

    fromRDFa(rdfa, subject){
            for(let triple in rdfa){
                if(triple.subject === subject){
                    const dels = this.store.match(triple.subject, triple.predicate, undefined);
                    const ins = [new Statement(triple.subject, triple.predicate, triple.object)];
                    this.store.addAll(ins);
                    this.store.removeStatements(del);
                }
            }
    }

    toRDFa(){

    }
}
