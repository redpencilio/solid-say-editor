import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * Component responsible for rendering a file-tree, folders are collapsable and files selectable
 *
 * @module components
 * @class FileListComponent
 * @extends Ember.Component
 */
export default class FileListComponent extends Component {
  
  
     /**
     * Toggles are folder's children visiblity
     * If it is the first time a folder opens, loads its children
     *
     * @method toggle
     *
     * @param {Folder} folder The file to be added
     * 
     * @memberof FileListComponent
     * 
     * @public
    */
    @action
    async toggle(folder){
        this.args.onSelectFolder(folder);
        event.srcElement.nextElementSibling.classList.toggle("hidden");
        if(!event.srcElement.nextElementSibling.classList.contains("hidden")){
            await this.args.onOpenFolder(folder);
        }
        
    }
  }