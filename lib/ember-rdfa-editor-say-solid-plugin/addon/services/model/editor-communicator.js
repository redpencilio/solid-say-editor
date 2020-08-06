import Service from '@ember/service';

export default class ModelEditorCommunicatorService extends Service {


    /**
     * Generates a HTML span tag containing RDF attributes of the given 
     * predicate and object. 
     * 
     * @param {Object} predObj represents the predicate and the object both of type `NamedNode`.
     * @param {NamedNode} predObj.predicate 
     * @param {NamedNode} predObj.object 
     * @returns {String} a HTML span tag string with RDF attributes.
     */
    async generateRDFaTag({ predicate, object }) {
        const metadata = await this.fetchResourceMetaData(predicate);
        if (object.termType === "Literal") {
            return `<span property="${predicate.value}" content="${object.value}" title="${metadata[RDFS("comment").value]}"> ${object.value} </span>`;
        } else {
            return `<a property="${predicate.value}" href="${object.value}" title="${metadata[RDFS("comment").value]}">${object.value}</a>`;
        }
    }

        /**
     * Parses the given array list of `Statements` to HTML span tags describing the list of 
     * `Statements`. 
     * 
     * @param {Statement[]} quads an array containing statements of quads.
     * @returns {String} HTML span tag describing the given array of quad statements. 
     */
    async toRDFa(quads) {
        if (!quads) {
            return "";
        }
        let subject = quads[0].subject;
        let pred_obj_map = {};
        for (let quad of quads){
            if(quad.predicate.value in pred_obj_map){
                pred_obj_map[quad.predicate.value].push(quad);
            } else {
                pred_obj_map[quad.predicate.value] = [quad];
            }
        }
        let start = `<div about="${subject.value}">`;
        let stack = [start];
        stack.push(`<h3>${subject.value}</h3>`)
        for (let predUri in pred_obj_map){
            stack.push(`<div>`)
            stack.push(`<h4>${predUri}</h4>`)
            for (let quad of pred_obj_map[predUri]){
                let rdfaTag = await this.generateRDFaTag(quad);
                stack.push(rdfaTag);
            }
            stack.push(`</div>`)

        }

        stack.push("</div>");
        return stack.join("\n");
    }




     /**
     * 
     * Save say-editor's context RDF statements in the local forking store. 
     * The saving is done by keeping track of the state changes on the local store, through 
     * the use of `add` statements and `remove` statements. 
     * 
     * @param {EditorBlock} block A logical blob for which the content may have changed. A blob
     * either has a different semantic meaning, or is logically separated (eg: a separate list item). 
     * See say-editor's `block` definition.
     * @param {Context[]} triples a list of say-editor's context statements {subject, predicate, object}. 
     * @param {Editor} editor say editor which will be used to manipulate domNodes. 
     */
    fromRDFa(block, triples, editor) {

        triples.forEach(triple => {
            const replacementValue = (block.text)? block.text.trim() : "" ;

            if (triple.predicate !== "a" && triple.subject !== "#") {

                const subjectNode = rdflib.sym(triple.subject);
                const graphNode = this.getGraph(subjectNode, this.getType(subjectNode, triples));
                const predicateNode = rdflib.sym(triple.predicate);
                let domAttrReplaceValObj = {
                    "attr": undefined,
                    "value": replacementValue
                }
                let rdfWrapper;

                if (triple.datatype === RDFS("Resource").value) {
                    domAttrReplaceValObj.attr = "resource";
                    rdfWrapper = rdflib.sym;
                } else {
                    domAttrReplaceValObj.attr = "content";
                    rdfWrapper = rdflib.literal;
                }
                const quad = { subjectNode, predicateNode, objectNode : rdfWrapper(triple.object.trim()), graphNode }
                
                
                let { dels, newObjectNode } =
                    this.processNode(
                        quad,
                        block.semanticNode.domNode,
                        domAttrReplaceValObj,
                        rdfWrapper, 
                        editor
                    ); 

                const ins = [new Statement(subjectNode, predicateNode, newObjectNode, graphNode)];
                if (dels.length && dels[0].object.value.trim() !== replacementValue.trim()) {
                    console.log("called");
                    this.profile.madeChanges = true;
                    this.addQuadToCache(ins[0]);
                    this.store.addAll(ins)
                    this.store.removeStatements(dels);

                }
            }
        });
    }




    /**
     * 
     * Method responsible for fetching the old quad that needs to be deleted from the store
     * This method also updates the content-attribute of a span tag, or the href-attribute of an a-tag to the new value.
     * 
     * @param oldQuad The previous quad that needs to be deleted from the local store
     * @param domNode Dom-node that needs it's content- or href-attribute updated.
     * @param domAttrReplaceValObj Contains the attribute-key that needs to be updated, also contains the new attribute-value
     * @param rdfWrapper Responsible for creating a Resource-node or Literal-node, depending on the type of object.
     * @param {Editor} editor say editor which will be used to manipulate domNodes. 
     */
    processNode(oldQuad, domNode, domAttrReplaceValObj, rdfWrapper, editor) {
        let { subjectNode, predicateNode, objectNode, graphNode } = oldQuad;
        let dels = this.store.match(subjectNode, predicateNode, objectNode, graphNode);
        let updateObject = {}
        updateObject[domAttrReplaceValObj.attr]  = domAttrReplaceValObj.value; 
        editor.replaceDomNode(domNode, {
            callback: (domNode) => {
                if (domNode.hasAttribute(domAttrReplaceValObj.attr)) {
                    domNode.setAttribute(domAttrReplaceValObj.attr, domAttrReplaceValObj.value);
                }} ,

            failedCallback: (domNode, msg) => { console.log(`${domNode}\n ${msg}`)}, 
            motivation: "update (set) failed with nodesToWrap being undefined"
        })

        console.log("JKSDLMFJLSDj");
        
        let newObjectNode = rdfWrapper(domAttrReplaceValObj.value);
        return { dels, newObjectNode };
    }

}
