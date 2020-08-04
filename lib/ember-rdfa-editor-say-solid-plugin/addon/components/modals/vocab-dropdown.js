import Component from '@glimmer/component';
import * as NAMESPACE from "solid-addon/utils/namespaces"
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
export default class ModalsVocabDropdownComponent extends Component {

    @tracked
    vocabulary = [] ;
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


        this.vocabulary.sort( (pairA, pairB) => pairA.name - pairB.name); 
        console.log(this.vocabulary[0] );
        this.args.model["vocab"] = this.vocabulary[0].uri; 
    }

    createPair(uri, name){
        uri = uri.value; 
        return {uri, name}; 
    }

    @action
    chooseVocab() {
        console.log("CHOOSE VOCAB");
        console.log(event.target);
        this.args.model["vocab"] = event.target.value
    }

} 
