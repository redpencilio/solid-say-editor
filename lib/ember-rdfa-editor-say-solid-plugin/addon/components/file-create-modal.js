import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { action } from '@ember/object';
import { RDF } from 'solid-addon/utils/namespaces';
const { Statement } = rdflib;

/**
 * 
 *
 * @module editor-say-solid-plugin
 * @class FileCreateModalComponent
 * @extends Ember.Component
 */
export default class FileCreateModalComponent extends Component {
    @service rdfaCommunicator;
    @tracked fileValue;

    @action
    async save() {
        let file = rdflib.sym(this.args.folder.value + this.fileValue)
        await new Promise((resolve, reject) => {
            this.rdfaCommunicator.store.updater.put(file, [], 'text/turtle', (uri, ok, err) => {
                if (ok) {
                    resolve();
                } else {
                    reject(new Error("Could not create new document"));
                }
            });
        });
        await this.args.onCreate(file);
        this.args.onClose(); 
    }



}