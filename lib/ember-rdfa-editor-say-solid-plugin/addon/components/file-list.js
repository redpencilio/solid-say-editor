import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * Component responsible for rendering a file-tree, folders are collapsable and files selectable
 *
 * @module editor-say-solid-plugin
 * @class FileListComponent
 * @extends Ember.Component
 */
export default class FileListComponent extends Component {
  
  
    @action
    async toggle(folder){
        this.args.onSelectFolder(folder);
        event.srcElement.nextElementSibling.classList.toggle("hidden");
        if(!event.srcElement.nextElementSibling.classList.contains("hidden")){
            await this.args.onOpenFolder(folder);
        }
        
    }
  }