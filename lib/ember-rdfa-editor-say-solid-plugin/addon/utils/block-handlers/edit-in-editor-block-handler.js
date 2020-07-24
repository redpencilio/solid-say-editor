import SolidHandler from "./block-handler";
const EDIT_EDITOR_KEY = "say-solid:edit-in-editor-block-handler";
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';

export { EDIT_EDITOR_KEY };

export default class EditInEditorBlockHandler extends SolidHandler {

    @service profile;
    @service rdfaCommunicator;

    handle(hrId, block, hintsRegistry, editor) {
        if(this.profile.me){
            this.rdfaCommunicator.fromRDFa(block, block.context);
        }
    }
}