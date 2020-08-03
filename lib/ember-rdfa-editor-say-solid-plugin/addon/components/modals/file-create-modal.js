import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import { action } from '@ember/object';
import ModalComponent from './modal';

/**
 * 
 *
 * @module editor-say-solid-plugin
 * @class FileCreateModalComponent
 * @extends Ember.Component
 */
export default class FileCreateModalComponent extends ModalComponent {
    @service rdfaCommunicator;
    formComponent = "modals/forms/file-form";
    title = "Add file to:";
    subtitle = this.args.folder.value;


    @action
    async save() {
        let files = [];
        for (let [_, fileObj] of Object.entries(this.items)) {
            let file = rdflib.sym(this.args.folder.value + fileObj.file)
            await new Promise((resolve, reject) => {
                this.rdfaCommunicator.store.updater.put(file, [], 'text/turtle', (uri, ok, err) => {
                    if (ok) {
                        resolve();
                    } else {
                        reject(new Error("Could not create new document"));
                    }
                });
            });
            files.push(file);
        }
        await Promise.all(files.map(file => this.args.onCreate(file)));
        this.args.onClose();
    }

    @action
    addForm() {
        const uuidVal = super.addForm();
        this.items[uuidVal] = { file: "" };
    }



}