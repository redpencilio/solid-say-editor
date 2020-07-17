import SemanticModel, { property, string, integer, term, solid, rdfType } from 'solid-addon/models/semantic-model';



export default class RdfaSemanticModel extends SemanticModel {

    isRelevantContext(rdfa) {
        return false;
    }

    getPredObj(attr) {
        let attrDef = this.attributeDefinitions[attr];

        let property = undefined;
        let type = undefined;
        if (attrDef.predicate) {
            property = attrDef.predicate.value;
            type = attrDef.type;
        } else {

            property = attrDef.ns(attr).value;
            type = attrDef.type;
        }

        return { property, type, value: this[attr].value ? this[attr].value : this[attr] };
    }

    generateRDFaTag({ property, type, value }) {
        let content = type === "term" ? `href="${value}"` : `content="${value}"`;


        return `<span property="${property}" ${content}/>`;
    }

    toRDFa() {
        let start = `<span about="${this.uri}" typeof="${this.rdfType.value}">`;
        let stack = [start];
        for (let attr of this.attributes) {

            let rdfaTag = this.generateRDFaTag(this.getPredObj(attr));
            stack.push(rdfaTag);
        }

        stack.push("</span>");
        return stack.join("\n");
    }

    fromRDFa(rdfa) {
        if (this.isRelevantContext(rdfa)) {
            /** Translate to model */
            return undefined;
        }
        return undefined;
    }
}