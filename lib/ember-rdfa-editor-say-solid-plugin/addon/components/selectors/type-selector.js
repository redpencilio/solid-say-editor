import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

/**
 * Component responsible for rendering a list of selectable types and for fetching types from a store found in the private- and public type indexes
 *
 * @class TypeSelectorComponent
 * @extends Ember.Component
 * 
 * @property {Ember.Service} storeCommunicator
 * @property {Ember.Service} profile
 * @property {List} types
 * @property {Boolean} isLoading
 */
export default class TypeSelectorComponent extends Component {
  
    @tracked types;
    @service("model/store-communicator") storeCommunicator;
    @service profile;
    @tracked isLoading = false;

     /**
     * Fetches a list of types from the type indexes
     *
     * @method fetchSubjects
     *
     * @memberof TypeSelectorComponent
     * @public
    */
    @action
    async fetchTypes(){
        this.isLoading = true;
        let result = await this.storeCommunicator.fetchTypes();
        this.types = result;
        this.isLoading = false;
    }

    @action
    close(){
        this.args.onClose('');
    }
  }