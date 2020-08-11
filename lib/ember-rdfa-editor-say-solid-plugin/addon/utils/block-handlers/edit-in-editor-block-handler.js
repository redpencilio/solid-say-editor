import { inject as service } from '@ember/service';
import SolidHandler from "./block-handler";
import rdflib from "ember-rdflib";


const EDIT_EDITOR_KEY = "say-solid:edit-in-editor-block-handler";
export { EDIT_EDITOR_KEY };
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#")

const { Statement } = rdflib;
/**
 * Handler class responsible for handling events coming from the dispatcher and for sending updates to the rdflib-store when data is edited in the editor
 *
 * @module editor-say-solid-plugin
 * @class EditInEditorBlockHandler
 * @extends Ember.Component
 */
export default class EditInEditorBlockHandler extends SolidHandler {

    @service("model/store-communicator") store;

    // this method is called when an rdfa-tag in the editor is edited, rdfa-tags are converted to rdflib.js-triples and stored in the local store
    handle(hrId, block, hintsRegistry, editor) {
        this.fromRDFa(block, block.context, editor);
    }


    /**
   * 
   * Save say-editor's context RDF statements in the local forking store as the user 
   * edit the texts in the editor.  
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
            const originalObjectValue = this.extractUuid(block);
            if (triple.predicate !== "a" && triple.subject !== "#") {
                const subjectNode = rdflib.sym(triple.subject);
                const graphNode = this.store.getGraph(subjectNode, this.store.getType(subjectNode, triples));
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
                // const oldQuad = { subjectNode, predicateNode, objectNode: rdfWrapper(triple.object.trim()), graphNode }
                const oldQuad = new Statement(subjectNode, predicateNode, rdfWrapper(triple.object.trim()), graphNode);

                let newObjectNode =
                    this.processNode(
                        block.semanticNode.domNode,
                        domAttrReplaceValObj,
                        rdfWrapper,
                        editor
                    );
                const newQuad = new Statement(subjectNode, predicateNode, newObjectNode, graphNode);

                this.store.updateQuad(oldQuad, newQuad, originalObjectValue);
            }
        });
    }




    /**
     * 
     * Method responsible for fetching the old quad that needs to be deleted from the store
     * This method also updates the content-attribute of a span tag, or the href-attribute of an a-tag to the new value.
     * 
     * @param {Statement} oldQuad The previous quad that needs to be deleted from the local store
     * @param {DomNode} domNode Dom-node that needs it's content- or href-attribute updated.
     * @param {Object} domAttrReplaceValObj Contains the attribute-key that needs to be updated, also contains the new attribute-value.
     * @param {String} domAttrReplaceValObj.attr the new attribute value.
     * @param rdfWrapper Responsible for creating a Resource-node or Literal-node, depending on the type of object.
     * @param {Editor} editor say editor which will be used to manipulate domNodes. 
     */
    processNode(domNode, domAttrReplaceValObj, rdfWrapper, editor) {
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


        let newObjectNode = rdfWrapper(domAttrReplaceValObj.value);
        return newObjectNode;
    }


    /**
     * Gets the uuid of the attribute in the given logical block. 
     * The uuid is used to identify the correct attribute to update when typing in the editor. 
     * @param {EditorBlock} block A logical block from the editor containing the attribute, whose uuid will be extracted. 
     */
    extractUuid(block) {
        if (block.richNode.length) {
            let attributes = block.richNode[0].parent.domNode.attributes;
            return attributes["data-uuid"] ? attributes["data-uuid"].value.trim() : undefined;
        }
    }

}