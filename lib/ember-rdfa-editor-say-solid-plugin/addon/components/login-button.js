import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class LoginButtonComponent extends Component {
  
    @service rdfaCommunicator;
    @service("solid-auth") auth;
    @service profile;

    @action
    async login() {
        await this.auth.ensureLogin();
        await this.rdfaCommunicator.fetchTypeIndexes(this.auth.webId);
        await this.profile.fetchProfileInfo();
    }
  }