import SemanticModel, { property, string, integer, term, solid, rdfType } from 'solid-addon/models/semantic-model';



export default class RdfaSemanticModel extends SemanticModel {

    isRelevantContext(rdfa){
        return rdfa.find(ctxt => {
            return ctxt.object === this.rdfType.value && ctxt.subject === this.uri.value && ctxt.predicate === "a";
        });
    }

    getRelevantProperty(rdfa, subject, predicate){
        return rdfa.find(ctxt => {
            return ctxt.subject === subject && ctxt.predicate == predicate;
        });
    }

    toRDFa() {
        return undefined; 
    }

    fromRDFa(rdfa){
        if(this.isRelevantContext(rdfa)){
            for(let attributeDef in this.attributeDefinitions){
                let predicate;
                if(this.attributeDefinitions[attributeDef].ns){
                    predicate = this.attributeDefinitions[attributeDef].ns(attributeDef).value;
                } else if (this.attributeDefinitions[attributeDef].predicate){
                    predicate = this.attributeDefinitions[attributeDef].predicate.value;
                }
                const prop = this.getRelevantProperty(rdfa, this.uri.value, predicate);
                if(prop){
                    this[attributeDef] = prop.object;
                }
            }
        }
    }
}