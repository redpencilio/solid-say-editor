import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { action } from '@ember/object';
import { RDF } from 'solid-addon/utils/namespaces';
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

    @action
    async save(){
        let subject = rdflib.sym(this.args.graph.value + "#" + this.subjectValue);
        let type = rdflib.sym(this.typeValue);
        const newQuad = new Statement(subject, RDF("type"), type, this.args.graph);
        await this.rdfaCommunicator.store.update([], [newQuad]);
        await this.args.onCreate(subject, type);
        this.args.onClose(); 
    }
    


  }