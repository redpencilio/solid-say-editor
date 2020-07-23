import { action } from '@ember/object';
import Component from '@glimmer/component';
import {getOwner} from "@ember/application"; 
import { inject as service } from '@ember/service';
import { SAVE_KEY } from '../../utils/block-handlers/save-block-handler';

export default class EditorPluginsSaySolidEditCardComponent extends Component {
  @service rdfaCommunicator;
  owner = getOwner(this); 
  @service auth;


  @action
  async save() {
    await this.rdfaCommunicator.persist();
    this.owner.lookup(SAVE_KEY).handleClose(this.args.info, null);
  }

  @action 
 reset(){
   
  }
}
