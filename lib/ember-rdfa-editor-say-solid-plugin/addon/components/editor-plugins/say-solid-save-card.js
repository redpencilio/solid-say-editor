import { action } from '@ember/object';
import Component from '@glimmer/component';
import { getOwner } from "@ember/application";
import { inject as service } from '@ember/service';
import { SAVE_KEY } from '../../utils/block-handlers/save-block-handler';

export default class SaySolidSaveCard extends Component {
  @service rdfaCommunicator;
  owner = getOwner(this); 
  @service("solid-auth") auth;
  @service profile;


  @action
  async save() {
    await this.rdfaCommunicator.persist();
    this.owner.lookup(SAVE_KEY).handleClose(this.args.info, null);
  }


}
