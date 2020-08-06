import ModelSerializer from "./model-serializer";
import rdflib from "ember-rdflib"; 
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#");

export default class RDFaSerializer extends ModelSerializer {

    _serializeToHead(quads) {
        let subject = quads[0].subject.value; 
        let stack = [`<div about="${subject}">`];
        stack.push(`<h3>${subject}</h3>`);
        return stack.join("\n");
    
    }


    _serializeToBody(quads) {

        let stack = []; 
        let pred_obj_map = {};

        for (let quad of quads) {

            let predNode = quad.predicate.node;
            if (predNode.value in pred_obj_map) {
                pred_obj_map[predNode.value].push(quad);
            } else {
                pred_obj_map[predNode.value] = [quad]; 
            }
        }

        for(let predUri in pred_obj_map){
            stack.push("<div>");
            stack.push(`<h4>${predUri}</h4>`); 
            pred_obj_map[predUri].forEach(quad => {
                let rdfaTag = this._serializePredicateObject(quad); 
                stack.push(rdfaTag);
            });

            stack.push("</div>"); 
        }

        return stack.join("\n"); 

    }

    _serializeToTail(quads){
        return "</div>"; 
    }

    _serializePredicateObject({predicate, object}){
        object = object.node; 
        predicate = predicate.node; 
        let metadata = predicate.metadata; 
        if (object.termType === "Literal") {
            return `<span property="${predicate.value}" content="${object.value}" title="${metadata[RDFS("comment").value]}"> ${object.value} </span>`;
        } else {
            return `<a property="${predicate.value}" href="${object.value}" title="${metadata[RDFS("comment").value]}">${object.value}</a>`;
        }
    }

}