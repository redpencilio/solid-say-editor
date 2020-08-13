import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import LoginBlockHandler from '../../utils/block-handlers/login-block-handler';

/**
 * Card providing the option to login with your solid-account
 *
 * @class SaySolidLoginCard
 * @extends Ember.Component
 * 
 * @property {ProfileService} profile ember service to handle logging into Solid profiles
 * @property {Ember.Service} auth solid authentication service 
 */
export default class SaySolidLoginCard extends Component {

  @service profile;
  @service("solid-auth") auth;

  @action
  async close() {
    LoginBlockHandler.handleClose(this.args.info, '');
  }
}
