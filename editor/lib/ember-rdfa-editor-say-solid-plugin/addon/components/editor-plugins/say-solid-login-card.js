import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import SolidPersonModel from '../../models/solid/person';
import LoginBlockHandler from '../../utils/block-handlers/login-block-handler';

const { Fetcher, namedNode } = rdflib;

/**
 * Card displaying a hint of the Date plugin
 *
 * @module editor-say-solid-plugin
 * @class SaySolidCard
 * @extends Ember.Component
 */
export default class SaySolidLoginCard extends Component {
  @service  auth;


  @action
  async login() {
    await this.auth.ensureLogin();
    await this.auth.ensureTypeIndex();
  }

  @action
  async close(){
    LoginBlockHandler.handleClose(this.args.info, '');
    // const info = this.args.info;
    // info.hintsRegistry.removeHintsAtLocation( info.location, info.hrId, "say-solid-scope");
    // const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
    // const selection = info.editor.selectHighlight( mappedLocation );
    // info.editor.update( selection, {
    //   set: { innerHTML: '' }
    // });
  }
}
