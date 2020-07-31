import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import {v4 as uuidv4} from 'uuid'; 

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
    @tracked tripleForms = [uuidv4()]; 
    componentTripleMap =  {}; 


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
        console.log(this.componentTripleMap);
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