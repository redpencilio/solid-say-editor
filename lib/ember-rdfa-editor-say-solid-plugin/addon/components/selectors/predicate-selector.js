import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import Predicate from '../../models/statements/predicate';
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

  selectedQuads = new Set();


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
    let predicateObjs = {};
    for (const quad of quads) {
      if(quad.predicate.value in predicateObjs){
        predicateObjs[quad.predicate.value].addQuad(quad);
      } else {
        const metadata = await this.rdfaCommunicator.fetchResourceMetaData(quad.predicate);
        let predicateObj = new Predicate(quad.predicate, metadata[RDFS("label").value], metadata[RDFS("comment").value]);
        predicateObj.addQuad(quad);
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
    const rdfa = await this.rdfaCommunicator.toRDFa([...this.selectedQuads]);
    this.args.onClose(rdfa);
  }

  @action
  onSelect(quad) {
    if(this.selectedQuads.has(quad)){
      this.selectedQuads.delete(quad);
    } else {
      this.selectedQuads.add(quad);
    }
  }

  @action
  async addPredicate(quad){
    let predicateObjs = { ...this.attributes };
    if(quad.predicate.value in predicateObjs){
      predicateObjs[quad.predicate.value].addQuad(quad);
    } else {
      const metadata = await this.rdfaCommunicator.fetchResourceMetaData(quad.predicate);
      let predicateObj = new Predicate(quad.predicate, metadata[RDFS("label").value], metadata[RDFS("comment").value]);
      predicateObjs[quad.predicate.value] = predicateObj;
      predicateObjs[quad.predicate.value].addQuad(quad);
    }
    this.attributes = predicateObjs;
  }

  @action
  onContentClick(){
    event.stopPropagation();
  }
}