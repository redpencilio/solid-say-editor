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
 */
export default class ModalsVocabDropdownComponent extends Component {

    @tracked
    vocabulary = [] ;

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
    
        this.vocabList = this.vocabulary.map( pair =>pair.prefix); 
        this.vocabList.sort(); 
        
        this.vocabulary.forEach(pair => this.prefixUriMap[pair.prefix] = pair.uri); 
        this.args.model[this.args.key] = this.vocabulary[0].uri; 
    }
    
    createPair(uri, prefix){
        uri = uri.value;
        return {prefix, uri}; 
    }

    @action
    chooseVocab() {
        let input = event.target.value; 
        let chosenVocab = (this.prefixUriMap[input])? this.prefixUriMap[input]: input ;
        
        this.args.model[this.args.key] =  chosenVocab; 
    }

} 
