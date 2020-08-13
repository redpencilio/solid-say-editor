import Component from '@glimmer/component';
import * as NAMESPACE from "solid-addon/utils/namespaces"
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

/**
 * 
 * Modal component responsible for the ability to create new quads and adding them to your Solid Pod.
 *
 * @class ModalsVocabDropdownComponent
 * @extends Ember.Component
 * 
 * @property {List<Object>} vocabulary list containing the key-value pairs of prefixUriMap (Made so that it can be used in the hbs)
 * @property {Object} prefixUriMap Maps the prefix of the vocab to its URI
 */
export default class ModalsVocabDropdownComponent extends Component {

    @tracked
    vocabulary = [];

    @tracked
    vocabList = [];

    prefixUriMap = {};

    constructor() {
        super(...arguments);

        this.vocabulary = [
            this.createPair(NAMESPACE.FOAF(), "foaf:"),
            this.createPair(NAMESPACE.RDF(), "rdf:"),
            this.createPair(NAMESPACE.SHACL(), "shacl:"),
            this.createPair(NAMESPACE.XSD(), "xsd:"),
            this.createPair(NAMESPACE.SOLID(), "solid:"),
            this.createPair(NAMESPACE.VCARD(), "vcard:"),
            this.createPair(NAMESPACE.LDP(), "ldp:"),
            this.createPair(NAMESPACE.DCT(), "dct:"),
            this.createPair(NAMESPACE.TRACKER(), "tracker:"),
            this.createPair(NAMESPACE.SKOS(), "skos:"),
            this.createPair(NAMESPACE.FORM(), "form:")
        ];

        this.vocabList = this.vocabulary.map(pair => pair.prefix);
        this.vocabList.sort();

        this.vocabulary.forEach(pair => this.prefixUriMap[pair.prefix] = pair.uri);
        this.args.model[this.args.key] = this.vocabulary[0].uri;
    }

    /**
     * @typedef {Object} PrefixUriPair
     * @property {String}  uri String URI of the predicate
     * @property {String}  prefix String prefix to represent the predicate
     * @memberof ModalsVocabDropdownComponent
     */

    /**
     * Creates an object containing the `prefix` and `uri` keys. 
     * 
     * @param {NamedNode} uri NamedNode representing the predicate's URI
     * @param {String} prefix string prefix of the predicate's URI 
     * @returns {PrefixUriPair} The prefix-URI pair object
     * @memberof ModalsVocabDropdownComponent
     */
    createPair(uri, prefix) {
        uri = uri.value;
        return { prefix, uri };
    }


    /**
     * Chooses the vocabulary to be used based on a dropdown list 
     * 
     * @memberof ModalsVocabDropdownComponent
     */
    @action
    chooseVocab() {
        let input = event.target.value;
        let chosenVocab = (this.prefixUriMap[input]) ? this.prefixUriMap[input] : input;

        this.args.model[this.args.key] = chosenVocab;
    }

} 