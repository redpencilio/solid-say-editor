import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import ForkableStore, { addGraphFor, delGraphFor } from 'solid-addon/utils/forking-store';
import { SOLID } from 'solid-addon/utils/namespaces';

const { Statement } = rdflib;
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#")

/**
 * Represents a communication service for the components to query 
 * the underlying forking store, which makes use of rdflib to access 
 * different datapods. 
 * @class
 * @public
 * @constructor
 */
export default class RdfaCommunicatorService extends Service {

    @service profile;
    store = null;
    privateTypeIndex = null;
    publicTypeIndex = null;

    @tracked
    insertCache = [];

    constructor() {
        super(...arguments);
        this.store = new ForkableStore();
    }

    


   





}
