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
        const cache = await this.rdfaCommunicator.reset();
        const editor = info.editor;

        for (let triple of cache) {
            const selection = editor.selectContext(info.location, { resource: triple.subject.value, property: triple.predicate.value });

            const reloadedTriple = await this.rdfaCommunicator.fetchTriples(triple.subject, new Set([triple.predicate.value]));
            console.log("Reset reloaded");
            console.log(reloadedTriple);
            if (reloadedTriple) {
                editor.update(selection, {
                    set: {
                        property: triple.predicate.value,
                        innerContent: reloadedTriple.pop().object.value

                    },

                })
            }
        }

    }
}
