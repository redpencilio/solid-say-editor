import SolidHandler from "./block-handler";
const EDIT_EDITOR_KEY = "say-solid:edit-in-editor-block-handler";
import { inject as service } from '@ember/service';
export { EDIT_EDITOR_KEY };

/**
 * Handler class responsible for sending updates to the rdflib-store when data is edited in the editor
 *
 * @module editor-say-solid-plugin
 * @class EditInEditorBlockHandler
 * @extends Ember.Component
 */
export default class EditInEditorBlockHandler extends SolidHandler {

    @service rdfaCommunicator;

    // this method is called when an rdfa-tag in the editor is edited, rdfa-tags are converted to rdflib.js-triples and stored in the local store
    handle(hrId, block, hintsRegistry, editor) {
        this.rdfaCommunicator.fromRDFa(block, block.context);
    }
}