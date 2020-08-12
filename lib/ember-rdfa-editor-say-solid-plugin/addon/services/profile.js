import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';

/**
 * Represents a communication service for the components to query 
 * the underlying forking store, which makes use of rdflib to access 
 * different datapods. 
 * @class ProfileService
 * @public
 * 
 * @property {Ember.Service} auth Ember-solid authentication service
 * @property {Ember.Service} storeCommunicator Store communicator
 * @property {Boolean} madeChanges Indicates if there are local changes
 * @property {NamedNode} me Namednode of the currently logged in user
 */
export default class ProfileService extends Service {
    @service("solid-auth") auth;
    @service("model/store-communicator") storeCommunicator;
    @tracked madeChanges = false;

    @tracked me = null;

    /**
     * Fetches the profile of the solid user and loads the profile document in the 
     * local store. 
     * The user should've already been logged in on his solid.community data pod. 
     * 
     * @memberof ProfileService
     */
    async fetchProfileInfo(){
        const me = rdflib.sym(this.auth.webId);
        const fetcher = this.storeCommunicator.store.fetcher;
        await fetcher.load(me);
        this.me = me;
    }



}
