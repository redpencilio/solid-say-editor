import SolidHandler from "./block-handler";
const EDIT_EDITOR_KEY = "say-solid:edit-in-editor-block-handler";
import { inject as service } from '@ember/service';
import { FOAF } from "solid-addon/utils/namespaces";

export { EDIT_EDITOR_KEY };

export default class EditInEditorBlockHandler extends SolidHandler {

    @service auth;
    @service profile;

    hasRelevantContext(block) {
        return block.context.find(ctxt => {
            return ctxt.subject === this.auth.webId && ctxt.predicate === FOAF("name").value;
        }
        );
    }

    handle(hrId, block, hintsRegistry, editor) {
        if(this.hasRelevantContext(block)){
            console.log(this.getName(block));
            this.profile.me.name = this.getName(block);
        }
    }

    getName(block){
        return block.context.find(n => n.predicate === FOAF("name").value).object;
    }
}