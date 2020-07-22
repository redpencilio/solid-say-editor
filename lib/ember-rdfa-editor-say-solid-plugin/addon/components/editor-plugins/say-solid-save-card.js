import { action } from '@ember/object';
import Component from '@glimmer/component';
import {getOwner} from "@ember/application"; 
import { inject as service } from '@ember/service';
import { SAVE_KEY } from '../../utils/block-handlers/save-block-handler';

export default class EditorPluginsSaySolidEditCardComponent extends Component {
  @service("solid-auth") auth;
  @service("rdf-store") store;
  @service profile;
  owner = getOwner(this); 


  @action
  async save() {
    await this.store.persist();
    this.owner.lookup(SAVE_KEY).handleClose(this.args.info, null);
  }
}
