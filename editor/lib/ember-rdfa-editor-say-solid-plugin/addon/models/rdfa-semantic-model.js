import SemanticModel, { property, string, integer, term, solid, rdfType } from 'solid-addon/models/semantic-model';



export default class RdfaSemanticModel extends SemanticModel {

    isRelevantContext(rdfa){
        return false; 
    }
    
    toRDFa() {
        console.log("RdfaSemanticModel"); 
        for (let attr in this.attributes){
         console.log(attr);
        }
        return undefined; 
    }

    fromRDFa(rdfa){
        if (this.isRelevantContext(rdfa)){
            /** Translate to model */
            return undefined; 
        }
        return undefined; 
    }
}