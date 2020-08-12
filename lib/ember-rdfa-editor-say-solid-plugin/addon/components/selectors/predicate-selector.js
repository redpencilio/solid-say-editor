import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { RDFA_SERIALIZER } from '../../utils/serializers/rdfa-serializer';
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#")
/**
 * Component responsible for rendering a list of selectable predicates and for fetching predicates from a store for a specific subject
 *
 * @module editor-say-solid-plugin
 * @class PredicateSelectorComponent
 * @extends Ember.Component
 */
export default class PredicateSelectorComponent extends Component {
  @service("model/store-communicator") storeCommunicator;
  @service profile;
  @tracked popup = false;
  selectedQuads = new Set();
  @tracked
  isLoading = true; 


  @tracked
  attributes = {};
  @tracked
  pred_metadata = {};

  owner = getOwner(this);
  serializer = this.owner.lookup(RDFA_SERIALIZER);

  /**
  * Fetches a list of triples from the store for the given subject, also fetches metadata for the predicates of the triples
  * Triples are grouped per predicate
  *
  * @method resetAttributes
  *
  * @memberof PredicateSelectorComponent
  * @public
  */
  @action
  async resetAttributes() {
    this.isLoading = true; 
    let quads = await this.storeCommunicator.fetchTriples(this.args.subject, undefined, this.args.graph);
    let predicateObjs = {};
    let metadata = {};
    for (const quad of quads) {
      if (quad.predicate.value in predicateObjs) {
        predicateObjs[quad.predicate.value].push(quad);
      } else {
        const result = await this.storeCommunicator.fetchResourceMetaData(quad.predicate);
        metadata[quad.predicate.value] = result;
        predicateObjs[quad.predicate.value] = [quad];
      }

    }
    this.pred_metadata = metadata;
    this.attributes = predicateObjs;

    this.isLoading= false; 
  }

  /**
   * Generates and inserts rdfa-tags for the selected triples and their metadata for the given subject
   *
   * @method insert
   *
   * @memberof PredicateSelectorComponent
   * @public
   */
  @action
  async insert() {
    const rdfa = this.serializer.serializeQuads([...this.selectedQuads], this.pred_metadata);
    this.args.onClose(rdfa);
  }

  @action
  onSelect(quad) {
    if (this.selectedQuads.has(quad)) {
      this.selectedQuads.delete(quad);
    } else {
      this.selectedQuads.add(quad);
    }
  }


   /**
   * Method that is called when a triple has been created, this will add the triple to predicate-selection-list
   * Fetches metadata of the predicate of the triple if necessary
   *
   * @method insert
   *
   * @memberof PredicateSelectorComponent
   * 
   * @public
   */
  @action
  async addPredicate(quad) {
    let predicateObjs = { ...this.attributes };
    let metadata = { ...this.pred_metadata };
    if (quad.predicate.value in predicateObjs) {
      predicateObjs[quad.predicate.value].pushObject(quad);
    } else {
      const result = await this.storeCommunicator.fetchResourceMetaData(quad.predicate);
      metadata[quad.predicate.value] = result;
      predicateObjs[quad.predicate.value] = [quad];
    }
    this.pred_metadata = metadata;
    this.attributes = predicateObjs;
  }

  @action
  onContentClick() {
    event.stopPropagation();
  }
}