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

    constructor() {
        super(...arguments);
        this.store = this.rdfStore.store;
    }

    generateRDFaTag({ predicate, object }) {
        return `<span property="${predicate.value}"> ${object.value} </span>`;
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
        return this.getGraphByType_TypeIndex(type, this.publicTypeIndex) || this.getGraphByType_TypeIndex(type, this.privateTypeIndex) || subject.doc();
    }

    fromRDFa(block, rdfa) {
        rdfa.forEach(triple => {
            if (triple.predicate !== "a") {
                let subject = rdflib.sym(triple.subject);
                let graph = this.getGraph(subject, this.getType(subject, rdfa));
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
                console.log(dels[0].object.value);
                console.log(triple.object);
                if (!dels || dels[0].object.value.trim() !== triple.object.trim()) {
                    this.profile.madeChanges = true;
                    this.store.addAll(ins);
                    this.store.removeStatements(dels);
                }
            }
        });
    }
    async fetchTriples(subject) {
        return this.fetchTriples(subject, undefined);
    }

    fetchTriples(subject, attributes) {
        return new Promise((resolve, reject) => {
            const graph = this.getGraph(subject);
            this.store.fetcher.nowOrWhenFetched(graph, (ok, body, xhr) => {
                if (ok) {
                    let result_triples = this.store.match(subject, undefined, undefined, graph);
                    console.log(result_triples);
                    if (attributes) {
                        result_triples = result_triples.filter(triple => attributes.has(triple.predicate.value));
                    };
                    resolve(result_triples);
                } else {
                    reject(new Error("Could not load triples"))
                }
            });
        })

    }

    fetchSubjectsByGraph(graph){
        return new Promise((resolve, reject) => {
            this.store.fetcher.nowOrWhenFetched(graph, (ok, body, xhr) => {
                if (ok) {
                    let triples = this.store.match(undefined, undefined, undefined, graph);
                    console.log(triples);
                    let subjects = new Set(triples.map(triple => triple.subject));
                    resolve(subjects);
                } else {
                    reject(new Error("Could not load subjects"))
                }
            })
        });
    }

    getGraphByType(type){
        const graph = this.getGraphByType_TypeIndex(type, this.publicTypeIndex) || this.getGraphByType_TypeIndex(type, this.privateTypeIndex);
        console.log(graph);
        if(graph){
            return graph;
        } else {
            throw new Error("No graph linked to this type found");
        }
    }

    getGraphByType_TypeIndex(type, typeIndex) {
        // Search for type registration in typeIndex
        if (type && typeIndex) {
            const subject = this.store.any(undefined, SOLID("forClass"), type, typeIndex);
            if (subject) {
                return this.store.any(subject, SOLID("instance"), undefined, typeIndex);
            }
        }
        return false;
    }

    // searchTypesByName(typeName){
    //     let types = this.fetchTypes();
    //     return types.filter(type => type.value.toLowerCase().contains(typeName.toLowerCase()));
    // }

    fetchTypes(){
        let publicTypeRegs = this.store.match(undefined, SOLID("forClass"), undefined, this.publicTypeIndex);
        let privateTypeRegs = this.store.match(undefined, SOLID("forClass"), undefined, this.privateTypeIndex);
        let typeRegs = publicTypeRegs.concat(privateTypeRegs);
        let types = typeRegs.map(typeReg => typeReg.object);
        return types;
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

    async fetchTypeIndexes(webId) {
        const me = rdflib.sym(webId);
        await this.store.load(me.doc());
        this.privateTypeIndex = this.store.any(me, SOLID("privateTypeIndex"), undefined, me.doc());
        this.publicTypeIndex = this.store.any(me, SOLID("publicTypeIndex"), undefined, me.doc());
        await this.store.load(this.privateTypeIndex);
        await this.store.load(this.publicTypeIndex);
    }
}
