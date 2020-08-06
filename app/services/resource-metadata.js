import ResourceMetadataService from '@lblod/ember-rdfa-editor/services/resource-metadata';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#");

export default class SolidResourceMetadataService extends ResourceMetadataService {

    @service rdfaCommunicator;
    async fetch(uri){
        console.log("fetch");
        let resource = rdflib.sym(uri);
        let metadata = await this.rdfaCommunicator.fetchResourceMetaData(resource);
        return {
            label: metadata[RDFS("label").value],
            comment: metadata[RDFS("comment").value]
        }
    }
}