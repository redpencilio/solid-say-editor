import Quad from "../../models/statements/quad";

export default class ModelSerializer {
    /**
     * Serialize the given list of quads into a appropriate format (default is string). 
     * 
     * @param {List<Quad>} quads  list of custom quads defined in the model 
     */
    serializeQuads(quads) {
        if (!quads || quads.length <= 0) {
            return "";
        }
        let head = this._serializeToHead(quads);
        let stack = this._serializeToBody(quads);
        let tail = this._serializeToTail(quads);
        return head + stack + tail;
    }

    /**
     * Generate the serialization of the body part from the given quads. 
     * @param {List<Quad>} quads  list of custom quads defined in model 
     * @returns {String} Body string
     */
    _serializeToBody(quads) {
        throw Error("Not Implemented yet: serializeToBody");
    }

    /**
     * Generate the serialization of the body part from the given quads. 
     * @param {List<Quad>} quads list of custom quads defined in model
     * @returns {String} Head string
     */

    _serializeToHead(quads) {
        throw Error("Not Implemented yet: serializeToHead");
    }


    /**
     * Generate the serialization of the tail part from the given quads. 
     * 
     * @param {List<Quad>} quads list of custom quads defined in the model 
     * @returns {String} Tail string
     */
    _serializeToTail(quads) {
        throw Error("Not Implemented yet: serializeToTail");
    }
}