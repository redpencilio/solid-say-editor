import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';


export default class PredicateSelectorComponent extends Component {
  @service("solid-auth") auth;
  @service rdfaCommunicator;
  @service profile;

  checkedAttributes = new Set();


  @tracked
  attributes = new Set();

  constructor() {
    super(...arguments);
    if(this.auth.webId){
      this.resetAttributes();
    }
  }

  async resetAttributes() {
    let predicates = await this.rdfaCommunicator.fetchTriples(this.args.subject);
    predicates = predicates.map(triple => triple.predicate);
    this.attributes = new Set(predicates);
  }

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

  @action
  async login() {
    await this.auth.ensureLogin();
    await this.rdfaCommunicator.fetchTypeIndexes(this.auth.webId);
    await this.profile.fetchProfileInfo();
    await this.resetAttributes();
  }
}