import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

/**
 * Component responsible for rendering a list of selectable types and for fetching types from a store found in the private- and public type indexes
 *
 * @module editor-say-solid-plugin
 * @class TypeSelectorComponent
 * @extends Ember.Component
 */
export default class TypeSelectorComponent extends Component {
  
    @tracked types;
    @service("model/store-communicator") storeCommunicator;
    @service profile;

     /**
     * Fetches a list of types from the type indexes
     *
     * @method fetchSubjects
     *
     * @public
    */
    @action
    async fetchTypes(){
        let result = await this.storeCommunicator.fetchTypes();
        this.types = result;
    }

    @action
    close(){
        this.args.onClose('');
    }
  }