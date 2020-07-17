import { action } from '@ember/object';
import Component from '@glimmer/component';
import {getOwner} from "@ember/application"; 
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import SolidPersonModel from '../../models/solid/person';
import { tracked } from '@glimmer/tracking';
import EditBlockHandler, { EDIT_KEY } from "../../utils/block-handlers/edit-block-handler";
const { Fetcher, namedNode } = rdflib;

export default class EditorPluginsSaySolidEditCardComponent extends Component {
  @service profile;
  @service auth;
  @service("rdf-store") store;
  owner = getOwner(this); 
  // handler =

  @tracked isEditMode = false;

  @action
  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  @action
  async saveUser() {
    this.owner.lookup(EDIT_KEY).handleClose(this.args.info, 
      `<a href=${this.auth.webId}><span property="foaf:name">${this.profile.me.name}</span></a>`);
    this.store.persist();
    console.log("save");
  }
}
