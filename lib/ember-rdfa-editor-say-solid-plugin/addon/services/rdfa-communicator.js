import Service from '@ember/service';
import ForkableStore from 'solid-addon/utils/forking-store';
import rdflib from 'ember-rdflib';
import { inject as service } from '@ember/service';


const { Statement } = rdflib;

export default class RdfaCommunicatorService extends Service {
    @service("rdf-store") rdfStore;
    @service profile;
    store = null;
    privateTypeIndex = null;
    publicTypeIndex = null;

    constructor() {
        super(...arguments);
        this.store = this.rdfStore.store;
    }

    getGraph(subject) {
        //TODO get graph by type
        return subject.doc();
    }

    generateRDFaTag({ predicate, object }) {
        return `<span property="${predicate.value}"> ${object.value} </span>`;
    }
    fromRDFa(rdfa, subject) {
        rdfa.forEach(triple => {
            if (triple.subject === subject.value && triple.predicate !== "a") {
                const graph = this.getGraph(subject);
                console.log(triple.object);
                const dels = this.store.match(subject, rdflib.sym(triple.predicate), undefined, graph);
                const ins = [new Statement(subject, rdflib.sym(triple.predicate), rdflib.literal(triple.object.trim()), graph)];
                if (!dels || dels[0].object.value.trim() !== triple.object.trim()) {
                    this.profile.madeChanges = true;
                    this.store.addAll(ins);
                    this.store.removeStatements(dels);
                }
            }
        });
    }
    fetchTriples(subject) {
        return this.toRDFa(subject, undefined);
    }

    fetchTriples(subject, attributes) {
        const graph = this.getGraph(subject);
        let result_triples = this.store.match(subject, undefined, undefined, graph);

        console.log(result_triples);
        if (attributes) {
            result_triples = result_triples.filter(triple => attributes.has(triple.predicate.value));
        };

        return result_triples;
    }


    toRDFa(triples) {
        if (!triples) {
            return "";
        }
        let subject = triples[0].subject; 
        let start = `<span about="${subject.value}">`;
        let stack = [start];
        for (let triple of triples) {

            let rdfaTag = this.generateRDFaTag(triple);
            stack.push(rdfaTag);
        }

        stack.push("</span>");
        return stack.join("\n");
    }


    persist() {
        this.store.persist();
    }
}
