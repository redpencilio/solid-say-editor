import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

/**
 * Button Component responsible for logging in, fetching the type indexes and the profile info
 *
 * @module editor-say-solid-plugin
 * @class LoginButtonComponent
 * @extends Ember.Component
 */
export default class LoginButtonComponent extends Component {
  
    @service storeCommunicator;
    @service("solid-auth") auth;
    @service profile;

    /**
   * Method that logs in, fetches the public- and private- type indexes, and finally fetches the profile info
   *
   * @method login
   *
   * @public
   */
    @action
    async login() {
        await this.auth.ensureLogin();
        await this.rdfaCommunicator.fetchTypeIndexes(this.auth.webId);
        await this.profile.fetchProfileInfo();
    }
  }