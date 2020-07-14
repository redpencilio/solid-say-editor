import Service from '@ember/service';
import normalizeLocation from '../utils/normalize-location';

/**
 * Entry point for SaySolid
 *
 * @module editor-say-solid-plugin
 * @class RdfaEditorSaySolidPlugin
 * @constructor
 * @extends EmberService
 */
export default class RdfaEditorSaySolidPlugin extends Service {

  /**
   * Handles the incoming events from the editor dispatcher.  Responsible for generating hint cards.
   *
   * @method execute
   *
   * @param {string} hrId Unique identifier of the state in the HintsRegistry.  Allows the
   * HintsRegistry to update absolute selected regions based on what a user has entered in between.
   * @param {Array} rdfaBlocks Set of logical blobs of content which may have changed.  Each blob is
   * either has a different semantic meaning, or is logically separated (eg: a separate list item).
   * @param {Object} hintsRegistry Keeps track of where hints are positioned in the editor.
   * @param {Object} editor Your public interface through which you can alter the document.
   *
   * @public
   */
  execute(hrId, rdfaBlocks, hintsRegistry, editor) {
    const hints = [];

    for( const rdfaBlock of rdfaBlocks ){
      console.log(rdfaBlock);
      hintsRegistry.removeHintsInRegion(rdfaBlock.region, hrId, "say-solid-scope");

      const match = rdfaBlock.text.match(/solid:([a-z]+)/);
      if( match ) {
        const { 0: fullMatch, 1: term, index: start } = match;

        const absoluteLocation = normalizeLocation( [ start, start + fullMatch.length ], rdfaBlock.region );
        let card;
        if(term === "me"){
          card = "editor-plugins/say-solid-fetch-card";
        } else if(term === "login"){
          card = "editor-plugins/say-solid-login-card";
        }
        if(card){
          hints.push( {
            // info for the hintsRegistry
            location: absoluteLocation,
            card: card,
            // any content you need to render the component and handle its actions
            info: {
              hrId, hintsRegistry, editor,
              term,
              location: absoluteLocation,
            }
          });
        }
      }
    }
    
    hintsRegistry.addHints(hrId, "say-solid-scope", hints);
  }
}
