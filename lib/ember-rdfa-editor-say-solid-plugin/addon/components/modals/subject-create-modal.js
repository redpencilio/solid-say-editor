import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { action } from '@ember/object';
import { RDF } from 'solid-addon/utils/namespaces';
import { v4 as uuidv4 } from 'uuid';
import ModalComponent from './modal';
const { Statement } = rdflib;

/**
 * 
 *
 * @module editor-say-solid-plugin
 * @class SubjectCreateModalComponent
 * @extends Ember.Component
 */
export default class SubjectCreateModalComponent extends ModalComponent {
    @service rdfaCommunicator;
    formComponent = "modals/forms/subject-form";
    title = "Add subject to:";
    subtitle = this.args.graph.value;

    @action
    async save(){
        let statements = [];
        for (let [_, subjectObj] of Object.entries(this.items)) {
            let statement = new Statement(rdflib.sym(this.args.graph.value + "#" + subjectObj.subject), RDF("type"), rdflib.sym(subjectObj.type), this.args.graph);
            if (statement) {
                statements.push(statement);
            }
        }

        await this.rdfaCommunicator.store.update([], statements);
        await Promise.all(statements.map(stmt => this.args.onCreate(stmt.subject, stmt.object)));
        this.args.onClose();
    }
    
    @action
    addForm() {
        const uuidVal = super.addForm();
        this.items[uuidVal] = {subject: "", type: ""};
    }


  }