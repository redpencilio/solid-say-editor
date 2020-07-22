import SolidHandler from "./block-handler";
const EDIT_EDITOR_KEY = "say-solid:edit-in-editor-block-handler";
import { inject as service } from '@ember/service';
import { FOAF } from "solid-addon/utils/namespaces";

export { EDIT_EDITOR_KEY };

export default class EditInEditorBlockHandler extends SolidHandler {

    @service("solid-auth") auth;
    @service profile;
    @service rdfaCommunicator;

    handle(hrId, block, hintsRegistry, editor) {
        
        if(this.profile.me){
            // this.profile.me.fromRDFa({ rdfa: block.context, block});
            this.rdfaCommunicator.fromRDFa(block.context, this.profile.me.uri);
        }
    }
}