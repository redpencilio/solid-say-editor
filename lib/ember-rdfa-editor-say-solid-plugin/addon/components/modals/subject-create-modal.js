import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { action } from '@ember/object';
import { RDF } from 'solid-addon/utils/namespaces';
import { v4 as uuidv4 } from 'uuid';

const { Statement } = rdflib;

/**
 * 
 *
 * @module editor-say-solid-plugin
 * @class SubjectCreateModalComponent
 * @extends Ember.Component
 */
export default class SubjectCreateModalComponent extends Component {
    @service rdfaCommunicator;
    @tracked subjectValue;
    @tracked typeValue;
    @tracked forms = new Set();
    @tracked subjects = {};

    constructor(){
        super(...arguments);
        this.addForm();
    }
    @action
    async save(){
        let statements = [];
        for (let [_, subjectObj] of Object.entries(this.subjects)) {
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
        const uuidVal = uuidv4();
        this.subjects[uuidVal] = {subject: "", type: ""};
        this.forms = new Set([...this.forms, uuidVal]);
    }


  }