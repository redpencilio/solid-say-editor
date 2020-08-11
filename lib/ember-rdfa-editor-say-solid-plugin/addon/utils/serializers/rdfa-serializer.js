import { inject as service } from "@ember/service";
import rdflib from "ember-rdflib";
import ModelSerializer from "./model-serializer";
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#");
const RDFA_SERIALIZER = "say-solid:rdfa-serializer";
export { RDFA_SERIALIZER };

export default class RDFaSerializer extends ModelSerializer {


    @service("model/store-communicator") store;

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

        for (let predUri in pred_obj_map) {
            stack.push("<div>");
            let label = metadata[predUri][RDFS("label").value];

            label = label ? label : predUri;

            stack.push(`<h4>${label}</h4>`);

            pred_obj_map[predUri].forEach(quad => {
                let rdfaTag = this._serializePredicateObject(quad, metadata);
                stack.push(rdfaTag);
            });

            stack.push("</div>");
        }

        return stack.join("\n");

    }

    _serializeToTail(quads, metadata) {
        return "</div>";
    }

    _serializePredicateObject({ predicate, object }, metadata) {
        let comment = metadata[predicate.value][RDFS("comment").value];
        let uuid = this.store.addObjectToUuidMap(object);
        if (object.termType === "Literal") {
            return `<span data-uuid="${uuid}" property="${predicate.value}" content="${object.value}" title="${comment}"> ${object.value} </span>`;
        } else {
            return `<a data-uuid="${uuid}" property="${predicate.value}" href="${object.value}" title="${comment}">${object.value}</a>`;
        }
    }

}
