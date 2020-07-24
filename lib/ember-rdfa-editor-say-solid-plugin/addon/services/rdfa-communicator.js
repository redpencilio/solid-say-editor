import Service from '@ember/service';
import ForkableStore from 'solid-addon/utils/forking-store';
import rdflib from 'ember-rdflib';
import { inject as service } from '@ember/service';
import { RDF, SOLID } from 'solid-addon/utils/namespaces';

const { Statement } = rdflib;
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#")


export default class RdfaCommunicatorService extends Service {
    @service("rdf-store") rdfStore;
    @service profile;
    store = null;
    privateTypeIndex = null;
    publicTypeIndex = null;

    insertCache = [];

    constructor() {
        super(...arguments);
        this.store = this.rdfStore.store;
    }

    generateRDFaTag({ predicate, object }) {
        return `<span property="${predicate.value}"> ${object.value} </span>`;
    }


    getGraphByType(type, typeIndex) {
        // Search for type registration in typeIndex
        if (type && typeIndex) {
            const subject = this.store.any(undefined, SOLID("forClass"), type, typeIndex);
            if (match) {
                return this.store.any(subject, SOLID("instance"), undefined, typeIndex);
            }
        }
        return false;
    }

    getType(subject, rdfa) {
        const typeTriple = rdfa.find(triple => {
            return triple.subject === subject.value && triple.predicate === "a";
        });
        if (typeTriple) {
            return rdflib.sym(typeTriple.object);
        }
    }

    getGraph(subject, type) {
        return this.getGraphByType(type, this.publicTypeIndex) || this.getGraphByType(type, this.privateTypeIndex) || subject.doc();
    }

    fromRDFa(block, rdfa, subject) {
        const graph = this.getGraph(subject, this.getType(subject, rdfa));
        rdfa.forEach(triple => {
            if (triple.subject === subject.value && triple.predicate !== "a") {
                const dels = this.store.match(subject, rdflib.sym(triple.predicate), undefined, graph);
                let newObject;
                if (triple.datatype === RDFS("Resource").value) {
                    let domNode = block.semanticNode.domNode;
                    if (domNode.hasAttribute("href")) {
                        domNode.setAttribute("href", block.text);
                    }
                    triple.object = block.text.trim();
                    newObject = rdflib.sym(triple.object);
                } else {
                    newObject = rdflib.literal(triple.object.trim());
                }
                const ins = [new Statement(subject, rdflib.sym(triple.predicate), newObject, graph)];
                if (!dels || dels[0].object.value.trim() !== triple.object.trim()) {
                    this.profile.madeChanges = true;

                    this.addTripleToCache(ins[0]); 
                    this.store.addAll(ins);
                    this.store.removeStatements(dels);
                }
            }
        });
    }

    async fetchTriples(subject) {
        return this.fetchTriples(subject, undefined);
    }

    async fetchTriples(subject, attributes) {
        const graph = this.getGraph(subject);
        await this.store.fetcher.nowOrWhenFetched(graph);
        let result_triples = this.store.match(subject, undefined, undefined, graph);

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

    addTripleToCache(triple) {
        this.insertCache = this.insertCache.filter(ins =>
            !(ins.subject === triple.subject &&
                ins.predicate === triple.predicate &&
                ins.graph === triple.graph)
        );
    }


    reset() {
        this.store.removeStatements(this.insertCache);
    }

    persist() {
        this.store.persist();
    }

    async fetchTypeIndexes(webId) {
        const me = rdflib.sym(webId);
        await this.store.load(me.doc());
        this.privateTypeIndex = this.store.any(me, SOLID("privateTypeIndex"), undefined, me.doc());
        this.publicTypeIndex = this.store.any(me, SOLID("publicTypeIndex"), undefined, me.doc());
        await this.store.load(this.privateTypeIndex);
        await this.store.load(this.publicTypeIndex);
    }
}
