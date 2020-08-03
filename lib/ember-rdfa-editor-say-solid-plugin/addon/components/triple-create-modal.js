import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { v4 as uuidv4 } from 'uuid';

const { Statement } = rdflib;

/**
 * 
 *
 * @module editor-say-solid-plugin
 * @class TripleCreateModalComponent
 * @extends Ember.Component
 */
export default class TripleCreateModalComponent extends Component {
    @service rdfaCommunicator;
    @tracked tripleForms = new Set([uuidv4()]);
    componentTripleMap = {};


    getNodeConstructor(type) {
        switch (type) {
            case "Literal":
                return rdflib.literal;
            case "Resource":
                return rdflib.sym;
            default:
                throw new Error(`Unknown type ${type}`);
        }
    }

    @action
    addTripleForm() {
        this.tripleForms = new Set([...this.tripleForms, uuidv4()]);
    }
    @action
    async save() {
        console.log(this.componentTripleMap);
        let graph = this.args.graph;
        if (!graph) {
            graph = this.args.subject.doc();
        }

        let statements = [];
        for (let [_, predObj] of Object.entries(this.componentTripleMap)) {
            let statement = this.composeStatement({
                subject: this.args.subject,
                predicate: predObj.predicate,
                object: predObj.object,
                graph: graph, 
                objType: predObj.objType
            });
            if (statement) {
                statements.push(statement);
            }
        }

        await this.rdfaCommunicator.store.update([], statements);
        await Promise.all(statements.map(stmt => this.args.onCreate(stmt)));
        this.args.onClose();

    }

    composeStatement({ subject, predicate, object, graph, objType }) {
        if (subject && predicate && object && graph && objType) {
            let objectConstructor = this.getNodeConstructor(objType);
            let predicateValue = rdflib.sym(predicate);
            let objectValue = objectConstructor(object);
            return new Statement(subject, predicateValue, objectValue, graph);
        } else {
            return undefined;
        }
    }



}