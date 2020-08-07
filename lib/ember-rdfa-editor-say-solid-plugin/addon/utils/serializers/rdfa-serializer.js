import ModelSerializer from "./model-serializer";
import rdflib from "ember-rdflib"; 
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#");

class RDFaSerializer extends ModelSerializer {

    _serializeToHead(quads, metadata) {
        let subject = quads[0].subject.value; 
        let stack = [`<div about="${subject}">`];
        stack.push(`<h3>${subject}</h3>`);
        return stack.join("\n");
    
    }


    _serializeToBody(quads, metadata) {

        let stack = []; 
        let pred_obj_map = {};

        for (let quad of quads) {

            let predNode = quad.predicate;
            if (predNode.value in pred_obj_map) {
                pred_obj_map[predNode.value].push(quad);
            } else {
                pred_obj_map[predNode.value] = [quad]; 
            }
        }

        for(let predUri in pred_obj_map){
            stack.push("<div>");
            let label = metadata[predUri][RDFS("label").value] ;

            label = label? label : predUri; 
            
            stack.push(`<h4>${label}</h4>`); 

            pred_obj_map[predUri].forEach(quad => {
                let rdfaTag = this._serializePredicateObject(quad, metadata); 
                stack.push(rdfaTag);
            });

            stack.push("</div>"); 
        }

        return stack.join("\n"); 

    }

    _serializeToTail(quads, metadata){
        return "</div>"; 
    }

    _serializePredicateObject({predicate, object}, metadata){
        let comment = metadata[predicate.value][RDFS("comment").value]; 
        
        if (object.termType === "Literal") {
            return `<span property="${predicate.value}" content="${object.value}" title="${comment}" data-original="${object.value}"> ${object.value} </span>`;
        } else {
            return `<a property="${predicate.value}" href="${object.value}" title="${comment}" data-original="${object.value}">${object.value}</a>`;
        }
    }

}



const singleton = new RDFaSerializer(); 


export default singleton; 