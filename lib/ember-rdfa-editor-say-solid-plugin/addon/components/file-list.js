import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class FileListComponent extends Component {
  
  
    @action
    toggle(event){
        event.srcElement.nextElementSibling.classList.toggle("hidden");
    }
  }