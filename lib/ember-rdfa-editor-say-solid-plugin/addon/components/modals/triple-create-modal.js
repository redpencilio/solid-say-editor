import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import ModalComponent from './modal';

const { Statement } = rdflib;

/**
 * 
 *
 * @module editor-say-solid-plugin
 * @class TripleCreateModalComponent
 * @extends Ember.Component
 */
export default class TripleCreateModalComponent extends ModalComponent {
    @service rdfaCommunicator;
    formComponent = "modals/forms/triple-form";
    title = "Add quad to:";
    subtitle = this.args.subject.value;

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
    addForm() {
        const uuidVal = super.addForm();
        this.items[uuidVal] = { predicate: "", object: "", objType: "", vocab:""};
    }

    @action
    async save() {
        let graph = this.args.graph;
        if (!graph) {
            graph = this.args.subject.doc();
        }

        let statements = [];
        for (let [_, predObj] of Object.entries(this.items)) {
            let statement = this.composeStatement({
                subject: this.args.subject,
                predicate:  predObj.vocab + predObj.predicate,
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