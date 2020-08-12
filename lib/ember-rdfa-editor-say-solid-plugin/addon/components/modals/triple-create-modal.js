import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import ModalComponent from './modal';
import * as Validators from "../../utils/form-validators";
const { Statement } = rdflib;
/**
 * @module components/modals
 */
/**
 * 
 * Modal component responsible for the ability to create new quads and adding them to your Solid Pod.
 *
 * @class TripleCreateModalComponent
 * @extends ModalComponent
 */
export default class TripleCreateModalComponent extends ModalComponent {
    @service("model/store-communicator") storeCommunicator;
    formComponent = "modals/forms/triple-form";
    title = "Add quad to:";
    subtitle = this.args.subject.value;

    initValidators() {
        this.addValidator("predicate", Validators.validateNoWhiteSpace, "Predicate must not have any white spaces between");
        this.addValidator("predicate", Validators.validateNotEmpty, "Predicate cannot be empty");
    }

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

    /**
     * 
     * Responsible for adding a form to create an additional quad
     * 
     * @method addForm
     * 
     * @memberof TripleCreateModalComponent
     */
    @action
    addForm() {
        return super.addForm({ predicate: "", object: "", objType: "", predVocab: "", objVocab: "" });
    }

    sanitizePredObj(predObj) {
        for (let key in predObj) {
            predObj[key] = predObj[key].trim();
        }
    }

    /**
    * Method responsible for creating a quad, saving it to the local store and uploading it to Solid
    *
    * @method save
    *
    * @memberof TripleCreateModalComponent
    * @public
    */
    @action
    async save() {
        let graph = this.args.graph;
        if (!graph) {
            graph = this.args.subject.doc();
        }

        let statements = [];
        for (let [_, form] of Object.entries(this.forms)) {
            const predObj = form.model;
            // this.sanitizePredObj(predObj);
            let objectVal = predObj.object;

            if (predObj.objType === "Resource") {
                objectVal = predObj.objVocab + objectVal;
            }

            let statement = this.composeStatement({
                subject: this.args.subject,
                predicate: predObj.predVocab + predObj.predicate,
                object: objectVal,
                graph: graph,
                objType: predObj.objType
            });
            if (statement) {
                statements.push(statement);
            }
        }
        await this.storeCommunicator.store.update([], statements);
        await Promise.all(statements.map(stmt => this.args.onCreate(stmt)));
        this.args.onClose();

    }

    /**
     * Creates a quad with a literal of resource object, depending on the objectType
     *
     * @method composeStatement
     *
     * @memberof TripleCreateModalComponent
     * @public
     */
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