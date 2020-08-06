import Service, { inject as service } from '@ember/service';
import ModelSerializer from "../../utils/serializers/model-serializer";
export default class ModelEditorCommunicatorService extends Service {


    serializer = new ModelSerializer();
    @service
    storeCommunicator;


    /**
     * Parses the given array list of `Statements` to HTML span tags describing the list of 
     * `Statements`. 
     * 
     * @param {Statement[]} quads an array containing statements of quads.
     * @returns {String} HTML span tag describing the given array of quad statements. 
     */
    async toRDFa(quads) {
        return this.serializer.serializeQuads(quads);
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
            const replacementValue = (block.text) ? block.text.trim() : "";

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
                const quad = { subjectNode, predicateNode, objectNode: rdfWrapper(triple.object.trim()), graphNode }


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
        updateObject[domAttrReplaceValObj.attr] = domAttrReplaceValObj.value;
        editor.replaceDomNode(domNode, {
            callback: (domNode) => {
                if (domNode.hasAttribute(domAttrReplaceValObj.attr)) {
                    domNode.setAttribute(domAttrReplaceValObj.attr, domAttrReplaceValObj.value);
                }
            },

            failedCallback: (domNode, msg) => { console.log(`${domNode}\n ${msg}`) },
            motivation: "update (set) failed with nodesToWrap being undefined"
        })

        console.log("JKSDLMFJLSDj");

        let newObjectNode = rdfWrapper(domAttrReplaceValObj.value);
        return { dels, newObjectNode };
    }

}
