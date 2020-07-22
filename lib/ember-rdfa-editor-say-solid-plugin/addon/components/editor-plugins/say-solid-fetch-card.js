import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import FetchBlockHandler from '../../utils/block-handlers/fetch-block-handler';

/**
 * Card displaying a hint of the Date plugin
 *
 * @module editor-say-solid-plugin
 * @class SaySolidCard
 * @extends Ember.Component
 */
export default class SaySolidFetchCard extends Component {
  @service("solid-auth") auth;
  @service("rdf-store") store;
  @service rdfaCommunicator;
  @service profile;
  checkedAttributes = new Set();


  @tracked
  attributes = [];

  @action
  async insert() {
    console.log("FETCHED!");
    let rdfa = this.profile.me.toRDFa(this.checkedAttributes);
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
    await this.auth.ensureTypeIndex();
    await this.profile.fetchProfileInfo();
    const predicates = this.rdfaCommunicator
      .fetchTriples(this.profile.me.uri)
      .filter(triple => triple.object.termType === "Literal")
      .map(triple => triple.predicate.value);
    console.log(predicates);
  }
}
