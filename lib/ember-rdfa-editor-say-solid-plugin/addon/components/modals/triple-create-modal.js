import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import ModalComponent from './modal';
import * as Validators from "../../utils/form-validators";
const { Statement } = rdflib;

/**
 * 
 * Modal component responsible for the ability to create new quads and adding them to your Solid Pod.
 *
 * @class TripleCreateModalComponent
 * @extends ModalComponent
 * @property {ModelStoreCommunicatorService} storeCommunicator our local triple store which will be used to update and addd triples to Solid pods
 * @property {String} formComponent ember pathname to identify the form component to load into the modal 
 * @property {String} title title of the modal component 
 * @property {String} subtitle subtitle of the modal component 
 */
export default class TripleCreateModalComponent extends ModalComponent {
    @service("model/store-communicator") storeCommunicator;
    formComponent = "modals/forms/triple-form";
    title = "Add quad to:";
    subtitle = this.args.subject.value;

    /**
     * Initialize the validators to be used in the modal component
     * @memberof TripleCreateModalComponent 
     */
    initValidators() {
        this.addValidator("predicate", Validators.validateNoWhiteSpace, "Predicate must not have any white spaces between");
        this.addValidator("predicate", Validators.validateNotEmpty, "Predicate cannot be empty");
    }


    /**
     * Given the `String` type of the node, use pattern matching to return the 
     * constructor for the corrensponding node. 
     * @memberof TripleCreateModalComponent
     * @param {String} type RDF type of the node
     */
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
     * @memberof TripleCreateModalComponent
     */
    @action
    addForm() {
        return super.addForm({ predicate: "", object: "", objType: "", predVocab: "", objVocab: "" });
    }


    /**
     * Sanitizes the object values by triming them. 
     * @memberof TripleCreateModalComponent
     * @param {Object} predObj mapping of predicate name to object value 
     */
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
     * Creates an rdflib `Statement` from the given custom object representing the `Statement`
     *
     * @method composeStatement
     *
     * @memberof TripleCreateModalComponent
     * @param {Object} customQuad object representing an RDF statement with the type of the object included
     * @param {NamedNode} customQuad.subject NamedNode representing the subject
     * @param {String} customQuad.predicate string URI of the predicate 
     * @param {String} customQuad.object string value of the object. It can be a URI or a Literal string
     * @param {NamedNode} customQuad.graph NamedNode representing the graph of the Statement 
     * @param {String} customQuad.objType type of the object, it can be "Literal"|"Resource"
     * @returns {Statement} rdflib statement created from the given `customQuad` object
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