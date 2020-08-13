import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import FetchBlockHandler from '../../utils/block-handlers/fetch-block-handler';

/**
 * Card responsible for fetching data from a solid-user profile, this card shows a predicate-selector
 *
 * @class SaySolidFetchCard
 * @extends Ember.Component
 * 
 * @property {ProfileService} profile ember service to handle logging into Solid profiles
 */
export default class SaySolidFetchCard extends Component {

  @service profile;


  /**
   * Handles the closing of the fetch card. 
   * @param {String}  rdfa html tags to be inserted upon closing the card. 
   * @memberof SaySolidFetchCard
   */
  @action
  onClose(rdfa) {
    FetchBlockHandler.handleClose(this.args.info, rdfa);
  }
}
