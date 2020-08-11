import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
/**
 * Button Component responsible for logging in, fetching the type indexes and the profile info
 *
 * @module editor-say-solid-plugin
 * @class LoginButtonComponent
 * @extends Ember.Component
 */
export default class LoginButtonComponent extends Component {
  
    @service("model/store-communicator") storeCommunicator;
    @service("solid-auth") auth;
    @service profile;
    @tracked providers = [];
    @tracked selectedProvider = undefined;

    constructor(){
        super(...arguments);
        this.providers = [
            "https://solid.community/",
            "https://inrupt.net/"
        ]
    }

    /**
   * Method that logs in, fetches the public- and private- type indexes, and finally fetches the profile info
   *
   * @method login
   *
   * @public
   */
    @action
    async login() {
        await this.auth.ensureLogin(this.selectedProvider);
        await this.storeCommunicator.fetchTypeIndexes(this.auth.webId);
        await this.profile.fetchProfileInfo();
    }

    @action
    chooseProvider(){
        this.selectedProvider = event.target.value;
        console.log(this.selectedProvider);
    }
  }