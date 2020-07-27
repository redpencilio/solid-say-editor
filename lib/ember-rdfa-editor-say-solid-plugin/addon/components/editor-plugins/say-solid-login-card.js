import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import LoginBlockHandler from '../../utils/block-handlers/login-block-handler';

/**
 * Card displaying a hint of the Date plugin
 *
 * @module editor-say-solid-plugin
 * @class SaySolidCard
 * @extends Ember.Component
 */
export default class SaySolidLoginCard extends Component {

  @service profile;
  @service("solid-auth") auth;
  
  @action
  async close(){
    LoginBlockHandler.handleClose(this.args.info, '');
  }
}
