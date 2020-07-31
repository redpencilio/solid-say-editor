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
    objectTypes = ["Literal", "Resource"]; 
    chosenType = this.objectTypes[0]; 

    @action
    chooseType(){
        this.chosenType = event.target.value; 
    }


    getNodeConstructor(type){
        switch(type) {
            case "Literal": 
                return rdflib.literal; 
            case "Resource": 
                return rdflib.sym;
            default: 
                throw new Error(`Unknown type ${type}`); 
        }
    }
    @action
    async save(){
        let graph = this.args.graph;
        if(!graph){
            graph = this.args.subject.doc();    
        }
        let objectConstructor = this.getNodeConstructor(this.chosenType); 
        let predicate = rdflib.sym(this.predicateValue);
        let object = objectConstructor(this.objectValue);
        const newQuad = new Statement(this.args.subject, predicate, object, graph);
        await this.rdfaCommunicator.store.update([], [newQuad]);
        await this.args.onCreate(predicate, object);
        this.args.onClose(); 

    }
    


  }