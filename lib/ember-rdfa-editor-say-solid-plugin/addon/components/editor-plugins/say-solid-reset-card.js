import { action } from '@ember/object';
import Component from '@glimmer/component';
import { getOwner } from "@ember/application";
import { inject as service } from '@ember/service';
import { SAVE_KEY } from '../../utils/block-handlers/reset-block-handler';

export default class EditorPluginsSaySolidResetCardComponent extends Component {
    @service auth; 
    @service profile;
    @service rdfaCommunicator; 
    owner = getOwner(this);

    constructor(){
        super(...arguments); 
        console.log("Reset solid card constructor");
    }

    @action
    async reset() {
        console.log("Reset solid card");
        const info = this.args.info;
        const editor = info.editor
        const location = info.location;
        const currentSelection = editor.selectCurrentSelection(); // This is works for selecting the current field being edited now 
        const selection = editor.selectContent;
    }
}
