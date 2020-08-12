import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import FetchBlockHandler from '../../utils/block-handlers/fetch-block-handler';
/**
 * @module components/editor-plugins
 */
/**
 * Card responsible for fetching data from a solid-user profile, this card shows a predicate-selector
 *
 * @class SaySolidFetchCard
 * @extends Ember.Component
 */
export default class SaySolidFetchCard extends Component {

  @service profile;


  @action
  onClose(rdfa){
    FetchBlockHandler.handleClose(this.args.info, rdfa);
  }
}
