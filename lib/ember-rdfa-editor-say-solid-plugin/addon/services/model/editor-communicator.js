import Service, { inject as service } from '@ember/service';
import ModelSerializer from "../../utils/serializers/model-serializer";
export default class ModelEditorCommunicatorService extends Service {


    rdfaSerializer = new ModelSerializer();
    @service("model/store-communicator") storeCommunicator;


    /**
     * Parses the given array list of `Statements` to HTML span tags describing the list of 
     * `Statements`. 
     * 
     * @param {Statement[]} quads an array containing statements of quads.
     * @returns {String} HTML span tag describing the given array of quad statements. 
     */
    async toRDFa(quads) {
        return this.rdfaSerializer.serializeQuads(quads);
    }




   
}
