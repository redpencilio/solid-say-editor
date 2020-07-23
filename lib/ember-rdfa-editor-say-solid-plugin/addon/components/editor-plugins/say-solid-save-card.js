import { action } from '@ember/object';
import Component from '@glimmer/component';
import { getOwner } from "@ember/application";
import { inject as service } from '@ember/service';
import { SAVE_KEY } from '../../utils/block-handlers/save-block-handler';

export default class SaySolidSaveCard extends Component {
  @service rdfaCommunicator;
  owner = getOwner(this);
  @service("solid-auth") auth;


  @action
  async save() {
    await this.rdfaCommunicator.persist();
    this.owner.lookup(SAVE_KEY).handleClose(this.args.info, null);
  }

  @action
  async reset() {
    console.log("save solid card");
    const info = this.args.info; 
    const editor = info.editor 
    const location = info.location; 
    const currentSelection = editor.selectCurrentSelection(); // This is works for selecting the current field being edited now 
    const selection = editor.selectContent;
  }
}
