import Service from '@ember/service';
import BlockHandler from  "../utils/block-handlers/block-handler"; 
import FetchBlockHandler from "../utils/block-handlers/fetch-block-handler"; 
import LoginBlockHandler from "../utils/block-handlers/login-block-handler"; 
import FilesBlockHandler from "../utils/block-handlers/files-block-handler"



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
   * @type {BlockHandler[]}
   */
  solidHandlers = [FetchBlockHandler, LoginBlockHandler, FilesBlockHandler]

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

    for( const rdfaBlock of rdfaBlocks ){
      for( const handler of this.solidHandlers){
        handler.handle(hrId, rdfaBlock, hintsRegistry, editor); 

      }
      
    }
    
  }
}
