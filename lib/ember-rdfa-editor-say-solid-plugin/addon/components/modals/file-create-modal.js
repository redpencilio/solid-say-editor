import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { action } from '@ember/object';
import { v4 as uuidv4 } from 'uuid';

/**
 * 
 *
 * @module editor-say-solid-plugin
 * @class FileCreateModalComponent
 * @extends Ember.Component
 */
export default class FileCreateModalComponent extends Component {
    @service rdfaCommunicator;
    @tracked forms = new Set();
    @tracked files = {};

    constructor() {
        super(...arguments);
        this.addForm();
    }

    @action
    async save() {
        let files = [];
        for (let [_, fileObj] of Object.entries(this.files)) {
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
        const uuidVal = uuidv4();
        this.files[uuidVal] = { file: "" };
        this.forms = new Set([...this.forms, uuidVal]);
    }



}