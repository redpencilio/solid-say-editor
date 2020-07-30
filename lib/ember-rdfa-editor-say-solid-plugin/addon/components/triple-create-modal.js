import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { action } from '@ember/object';

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
    @tracked predicateValue;
    @tracked objectValue;
    
    @action
    async save(){
        let graph = this.args.graph;
        if(!graph){
            graph = this.args.subject.doc();
        }
        const newQuad = new Statement(this.args.subject, rdflib.sym(this.predicateValue), rdflib.literal(this.objectValue), graph);
        console.log(newQuad);
        await this.rdfaCommunicator.store.update([], [newQuad]);
    }
    
  }