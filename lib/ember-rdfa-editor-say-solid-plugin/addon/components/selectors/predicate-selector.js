import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import Predicate from '../../utils/predicate';
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#")

/**
 * Component responsible for rendering a list of selectable predicates and for fetching predicates from a store for a specific subject
 *
 * @module editor-say-solid-plugin
 * @class PredicateSelectorComponent
 * @extends Ember.Component
 */
export default class PredicateSelectorComponent extends Component {
  @service rdfaCommunicator;
  @service profile;
  @tracked popup = false;

  checkedAttributes = {};


  @tracked
  attributes = {};

   /**
   * Fetches a list of predicates from the store for the given subject
   *
   * @method resetAttributes
   *
   * @public
   */
  @action
  async resetAttributes() {
    let quads = await this.rdfaCommunicator.fetchTriples(this.args.subject, undefined, this.args.graph);
    // predicates = predicates.map(triple => triple.predicate);
    let predicateObjs = {};
    for (const quad of quads) {
      if(quad.predicate.value in predicateObjs){
        predicateObjs[quad.predicate.value].addTarget(quad.object);
      } else {
        const metadata = await this.rdfaCommunicator.fetchResourceMetaData(quad.predicate);
        let predicateObj = new Predicate(quad.predicate, metadata[RDFS("label").value], metadata[RDFS("comment").value]);
        predicateObj.addTarget(quad.object);
        predicateObjs[quad.predicate.value] = predicateObj;
      }
      
    }
    this.attributes = predicateObjs;
  }
  
  /**
   * Generates and inserts rdfa-tags for the selected predicates for the given subject
   *
   * @method insert
   *
   * @public
   */
  @action
  async insert() {
    const triples = await this.rdfaCommunicator.fetchTriples(this.args.subject, this.checkedAttributes, this.args.graph); 

    const rdfa = await this.rdfaCommunicator.toRDFa(triples);
    this.args.onClose(rdfa);
  }

  @action
  onSelect(pred) {
    if (this.checkedAttributes.hasOwnProperty(pred.node.value)) {
      delete this.checkedAttributes[pred.node.value]; 
    } else {
      this.checkedAttributes[pred.node.value] = pred.node;
    }
  }

  @action
  togglePopup(){
    this.popup = !this.popup;
  }

  @action
  async addPredicate(predicate, object){
    let predicateObjs = { ...this.attributes };
    if(predicate.value in predicateObjs){
      predicateObjs[predicate.value].addTarget(object);
    } else {
      const metadata = await this.rdfaCommunicator.fetchResourceMetaData(predicate);
      let predicateObj = new Predicate(predicate, metadata[RDFS("label").value], metadata[RDFS("comment").value], object);
      predicateObjs[predicate.value] = predicateObj;
    }
    this.attributes = predicateObjs;
  }
}