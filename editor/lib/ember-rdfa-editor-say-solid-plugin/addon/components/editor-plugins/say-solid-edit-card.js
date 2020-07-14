import { action } from '@ember/object';
import { reads, not } from '@ember/object/computed';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import SolidPersonModel from '../../models/solid/person';

const { Fetcher, namedNode } = rdflib;

export default class EditorPluginsSaySolidEditCardComponent extends Component {
    
  
    @action
    async insert() {
      
      const me = await this.getProfileInfo();
      const info = this.args.info;
      info.hintsRegistry.removeHintsAtLocation( info.location, info.hrId, "say-solid-scope");
      const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
      const selection = info.editor.selectHighlight( mappedLocation );
      info.editor.update( selection, {
        set: { innerHTML: `<a href=${this.auth.webId} property="foaf:name">${me.name}</a>` }
      });
    }
}
