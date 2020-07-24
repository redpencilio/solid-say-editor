import { action } from '@ember/object';
import Component from '@glimmer/component';
import { getOwner } from "@ember/application";
import { inject as service } from '@ember/service';
import { SAVE_KEY } from '../../utils/block-handlers/reset-block-handler';
import { tracked } from '@glimmer/tracking';

export default class EditorPluginsSaySolidResetCardComponent extends Component {
    @service("solid-auth") auth;
    @service profile;
    @service rdfaCommunicator;
    owner = getOwner(this);

    constructor() {
        super(...arguments);
    }


    get changes() {
        return this.rdfaCommunicator.insertCache;
    }

    @action
    async reset() {
        console.log("Reset solid card");
        const info = this.args.info;
        const cache = this.rdfaCommunicator.reset();
        const editor = info.editor;

        for (let triple in cachce) {
            const { selections } = editor.selectContext(info.location, { resource: head.subject.value, property: cache.map(e => e.predicate.value) })
        }
        console.log(info.location);
        console.log(selections);
    }
}
