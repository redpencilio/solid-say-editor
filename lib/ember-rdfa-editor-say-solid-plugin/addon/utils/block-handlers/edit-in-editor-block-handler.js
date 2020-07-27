import SolidHandler from "./block-handler";
const EDIT_EDITOR_KEY = "say-solid:edit-in-editor-block-handler";
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';

export { EDIT_EDITOR_KEY };

export default class EditInEditorBlockHandler extends SolidHandler {

    @service rdfaCommunicator;

    // this method is called when an rdfa-tag in the editor is edited, rdfa-tags are converted to rdflib.js-triples and stored in the local store
    handle(hrId, block, hintsRegistry, editor) {
        this.rdfaCommunicator.fromRDFa(block, block.context);
    }
}