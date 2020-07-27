import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';

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

  checkedAttributes = new Set();


  @tracked
  attributes = new Set();

   /**
   * Fetches a list of predicates for the given subject
   *
   * @method resetAttributes
   *
   * @public
   */
  @action
  async resetAttributes() {
    let predicates = await this.rdfaCommunicator.fetchTriples(this.args.subject);
    predicates = predicates.map(triple => triple.predicate);
    this.attributes = new Set(predicates);
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
    const triples = await this.rdfaCommunicator.fetchTriples(this.args.subject, this.checkedAttributes); 

    const rdfa = this.rdfaCommunicator.toRDFa(triples);
    this.args.onClose(rdfa);
  }

  @action
  onSelect(pred) {
    if (this.checkedAttributes.has(pred)) {
      this.checkedAttributes.delete(pred);
    } else {
      this.checkedAttributes.add(pred);
    }
  }
}