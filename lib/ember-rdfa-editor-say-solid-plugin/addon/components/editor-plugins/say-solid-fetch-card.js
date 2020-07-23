import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import FetchBlockHandler from '../../utils/block-handlers/fetch-block-handler';
import rdflib from 'ember-rdflib';

/**
 * Card displaying a hint of the Date plugin
 *
 * @module editor-say-solid-plugin
 * @class SaySolidCard
 * @extends Ember.Component
 */
export default class SaySolidFetchCard extends Component {
  @service("solid-auth") auth;
  @service rdfaCommunicator;
  @service profile;

  checkedAttributes = new Set();
  heroes = rdflib.sym("https://jlpoelma1998.solid.community/public/heroes.ttl#spiderman");


  @tracked
  attributes = new Set();

  constructor() {
    super(...arguments);
    if (this.profile.me) {
      this.resetAttributes();
    }
  }

  async resetAttributes() {
    let predicates = await this.rdfaCommunicator.fetchTriples(this.heroes);
    console.log(predicates);
    predicates = predicates.map(triple => triple.predicate);
    this.attributes = new Set(predicates);
  }

  @action
  async insert() {
    const triples = await this.rdfaCommunicator.fetchTriples(this.heroes, this.checkedAttributes); 

    const rdfa = this.rdfaCommunicator.toRDFa(triples);
    FetchBlockHandler.handleClose(this.args.info, rdfa);
  }

  @action
  onSelect(pred) {
    if (this.checkedAttributes.has(pred)) {
      this.checkedAttributes.delete(pred);
    } else {
      this.checkedAttributes.add(pred);
    }
  }

  @action
  async login() {
    await this.auth.ensureLogin();
    await this.rdfaCommunicator.fetchTypeIndexes(this.auth.webId);
    await this.profile.fetchProfileInfo();
    await this.resetAttributes();
  }
}
