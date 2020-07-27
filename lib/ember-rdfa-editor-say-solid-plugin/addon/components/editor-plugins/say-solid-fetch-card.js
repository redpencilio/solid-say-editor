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

  @service profile;

  constructor() {
    super(...arguments);
  }

  @action
  onClose(rdfa){
    FetchBlockHandler.handleClose(this.args.info, rdfa);
  }
}
