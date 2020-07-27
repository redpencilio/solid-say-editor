import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import rdflib from 'ember-rdflib';
import { LDP, RDF, SP } from 'solid-addon/utils/namespaces';
import TypesBlockHandler from '../../utils/block-handlers/types-block-handler';

const { Fetcher, namedNode } = rdflib;

/**
 * Card displaying a tree of files in the Solid Pod
 *
 * @module editor-say-solid-plugin
 * @class SaySolidFilesCard
 * @extends Ember.Component
 */
export default class SaySolidTypesCard extends Component {

    @tracked selectedType = null;
    @tracked selectedGraph = null;
    @tracked selectedSubject = null;
    @service rdfaCommunicator;

    screens = {
        TYPES: "types",
        SUBJECTS: "subjects",
        PREDICATES: "predicates"
    };

    @tracked currentScreen = this.screens.TYPES;

    @action
    async onClose(rdfa) {
        TypesBlockHandler.handleClose(this.args.info, rdfa);
    }

    @action
    setSelectedType(type){
        this.selectedType = type;
        this.selectedGraph = this.rdfaCommunicator.getGraphByType(type);
    }

    @action
    setSelectedSubject(subject){
        this.selectedSubject = subject;
    }

    @action 
    openType(){
        this.currentScreen = this.screens.SUBJECTS;
    }

    @action 
    openSubject(){
        this.currentScreen = this.screens.PREDICATES;
    }
}