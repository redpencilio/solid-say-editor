import { action } from '@ember/object';
import Component from '@glimmer/component';
import { getOwner } from "@ember/application";
import { inject as service } from '@ember/service';
import { SAVE_RESET_KEY } from '../../utils/block-handlers/save-reset-block-handler';

export default class SaySolidSaveResetCard extends Component {
  @service("solid-auth") auth;
  @service profile;
  @service rdfaCommunicator;
  owner = getOwner(this);


  @action
  async save() {
    await this.rdfaCommunicator.persist();
    this.owner.lookup(SAVE_RESET_KEY).handleClose(this.args.info, null);
  }

  get changes() {
    return this.rdfaCommunicator.insertCache;
  }

  @action
  async reset() {
    console.log("Reset solid card");
    const info = this.args.info;
    const cache = await this.rdfaCommunicator.reset();
    const editor = info.editor;

    for (let triple of cache) {
      const selection = editor.selectContext(info.location, { resource: triple.subject.value, property: triple.predicate.value });
      const reloadedTriple = await this.rdfaCommunicator.fetchTriples(triple.subject, new Set([triple.predicate.value]));
      if (reloadedTriple) {
        editor.update(selection, {
          set: {
            property: triple.predicate.value,
            innerHTML: reloadedTriple[0].object.value
          },

        })
      }
    }
    this.owner.lookup(SAVE_RESET_KEY).handleClose(this.args.info);

  }
}
