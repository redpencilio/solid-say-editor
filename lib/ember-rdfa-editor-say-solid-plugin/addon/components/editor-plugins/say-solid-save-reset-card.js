import { action } from '@ember/object';
import Component from '@glimmer/component';
import { getOwner } from "@ember/application";
import { inject as service } from '@ember/service';
import { SAVE_RESET_KEY } from '../../utils/block-handlers/save-reset-block-handler';

/**
 * Card providing the option to save data to your solid-account, and overwriting data in the editor with data from solid.
 * This card both renders a save- and reset-button
 * @module editor-say-solid-plugin
 * @class SaySolidSaveResetCard
 * @extends Ember.Component
 */
export default class SaySolidSaveResetCard extends Component {
  @service profile;
  @service("model/store-communicator") storeCommunicator;
  owner = getOwner(this);


  /**
   * Saves data to Solid using the persist-method, and then closes the card
   *
   * @method save
   *
   * @memberof SaySolidSaveResetCard
   * @public
   */
  @action
  async save() {
    await this.storeCommunicator.persist();
    this.owner.lookup(SAVE_RESET_KEY).handleClose(this.args.info, null);
  }

  /**
   * Returns a list of triples, coming from solid, that were edited in the editor.
   *
   * @method changes
   *
   * @returns {Array} array of triples that were edited
   * @memberof SaySolidSaveResetCard
   * @public
   */
  get changes() {
    return this.storeCommunicator.insertCache;
  }

   /**
   * Method responsible for resetting the changed rdfa-contexts to their original values, coming from solid.
   *
   * @method reset
   * @memberof SaySolidSaveResetCard
   * @public
   */
  @action
  async reset() {
    const info = this.args.info;
    // reset the data in the local rdflib-store
    const cache = await this.storeCommunicator.reset();
    const editor = info.editor;

    // Iterates over every triple that was changed
    for (let {triple, objectUuid} of cache) {
      
      // selection contains the rdfa-contexts that need to be reset
      const selections = editor.selectContext(info.location, { resource: triple.subject.value, property: triple.predicate.value });
      selections.selections = this.filterSelections(selections.selections, objectUuid);
      console.log(selections);
      // fetch the triples that contain the original data of the edited triples
      let attributeObj = {}; 
      attributeObj[triple.predicate.value] = triple.predicate
      let originalObjectValue = this.storeCommunicator.uuid_obj_map[objectUuid];
      console.log(originalObjectValue);
      // const reloadedTriple = await this.storeCommunicator.fetchTriples(triple.subject, attributeObj);
      if (originalObjectValue) {
        // update the corresponding rdfa-context with the original value of the triple
        editor.update(selections, {
          set: {
            property: triple.predicate.value,
            innerHTML: originalObjectValue
          },

        })
      }
    }
    // when finished, close the reset-save card
    this.owner.lookup(SAVE_RESET_KEY).handleClose(this.args.info);

  }

  filterSelections(selections, uuid){
      return selections.filter(selection => selection.richNode.domNode.dataset["uuid"] === uuid);
  }
}
