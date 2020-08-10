import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import { action } from '@ember/object';
import { RDF } from 'solid-addon/utils/namespaces';
import ModalComponent from './modal';
import { validateNoWhiteSpace } from '../../utils/form-validators';
const { Statement } = rdflib;

/**
 * 
 * Modal component responsible for the ability to create new subjects and adding them to your Solid Pod.
 *
 * @module editor-say-solid-plugin
 * @class SubjectCreateModalComponent
 * @extends Ember.Component
 */
export default class SubjectCreateModalComponent extends ModalComponent {
    @service("model/store-communicator") storeCommunicator;
    formComponent = "modals/forms/subject-form";
    title = "Add subject to:";
    subtitle = this.args.graph.value;

    initValidators(){
        this.addValidator("subject", validateNoWhiteSpace, "Subject name may not contain any spaces.");
    }

    // Creates an new subject with a given name and type, adds it to the local store and uploads it to Solid
    @action
    async save(){
        let statements = [];
        for (let [_, form] of Object.entries(this.forms)) {
            const subjectObj = form.model;
            let statement = new Statement(rdflib.sym(this.args.graph.value + "#" + subjectObj.subject), RDF("type"), rdflib.sym(subjectObj.typeVocab + subjectObj.type), this.args.graph);
            if (statement) {
                statements.push(statement);
            }
        }

        await this.storeCommunicator.store.update([], statements);
        await Promise.all(statements.map(stmt => this.args.onCreate(stmt.subject, stmt.object)));
        this.args.onClose();
    }
    
    // Responsible for adding a form to create an additional subject
    @action
    addForm() {
        return super.addForm({subject: "", type: "", typeVocab: ""});
    }

    


  }