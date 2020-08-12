import EmberObject from '@ember/object';
/**
 * Handler class responsible for handling events coming from the dispatcher by relevant contexts (when the user has made changes to solid-data) and removing and insert save-reset-cards
 *
 * @class ModelSerializer
 * @extends EmberObject
 */
export default class ModelSerializer extends EmberObject {
    /**
     * Serialize the given list of quads into a appropriate format (default is string). 
     * 
     * @memberof ModelSerializer
     * @param {List<Statement>} quads  list of statements containing {subject, predicate, object, graph} 
     * @param {Object} metadata optional metadata needed by the serializers
     * @returns {String} html string serialization of the triples. 
     */
    serializeQuads(quads, metadata) {
        if (!quads || quads.length <= 0) {
            return "";
        }
        let head = this._serializeToHead(quads, metadata);
        let stack = this._serializeToBody(quads, metadata);
        let tail = this._serializeToTail(quads, metadata);
        return head + stack + tail;
    }

    /**
     * Generate the serialization of the body part from the given quads. 
     * 
     * @memberof ModelSerializer
     * @param {List<Statement>} quads  list of statements containing {subject, predicate, object, graph} 
     * @param {Object} metadata optional metadata needed by the serializers
     * @returns {String} Body string
     * 
     * @memberof ModelSerializer
     */
    _serializeToBody(quads, metadata) {
        throw Error("Not Implemented yet: serializeToBody");
    }

    /**
     * Generate the serialization of the body part from the given quads. 
     * @memberof ModelSerializer
     * @param {List<Statement>} quads list of statements containing {subject, predicate, object, graph}
     * @param {Object} metadata optional metadata needed by the serializers
     * @returns {String} Head string
     * 
     * @memberof ModelSerializer
     */

    _serializeToHead(quads, metadata) {
        throw Error("Not Implemented yet: serializeToHead");
    }


    /**
     * Generate the serialization of the tail part from the given quads. 
     * @memberof ModelSerializer
     * @param {List<Statement>} quads list of statements containing {subject, predicate, object, graph}      
     * @param {Object} metadata optional metadata needed by the serializers
     * @returns {String} Tail string
     * 
     * @memberof ModelSerializer
     */
    _serializeToTail(quads, metadata) {
        throw Error("Not Implemented yet: serializeToTail");
    }
}