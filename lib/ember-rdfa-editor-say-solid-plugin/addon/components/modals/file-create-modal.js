import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import { action } from '@ember/object';
import ModalComponent from './modal';
import { validateNotEmpty, validateFileName } from '../../utils/form-validators';

/**
 * 
 * Modal component responsible for the ability to create new files and adding them to your Solid Pod.
 *
 * @module editor-say-solid-plugin
 * @class FileCreateModalComponent
 * @extends Ember.Component
 */
export default class FileCreateModalComponent extends ModalComponent {
    @service("model/store-communicator") storeCommunicator;
    formComponent = "modals/forms/file-form";
    title = "Add file to:";
    subtitle = this.args.folder.value;

    initValidators(){
        this.addValidator("file", validateNotEmpty, "File name may not be empty.");
        this.addValidator("file", validateFileName, "File name may not contain spaces or special characters.");
    }


    // Given a list of filenames, this save function adds the files to solid and the file-tree in the editor.
    @action
    async save() {
        let files = [];
        for (let [_, form] of Object.entries(this.forms)) {
            let fileObj = form.model;
            let file = rdflib.sym(this.args.folder.value + fileObj.file)
            await new Promise((resolve, reject) => {
                this.storeCommunicator.store.updater.put(file, [], 'text/turtle', (uri, ok, err) => {
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

    // Responsible for adding a form to create an additional file
    @action
    addForm() {
        return super.addForm({ file: "" });
    }



}