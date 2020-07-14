import { action } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import SolidPersonModel from '../../models/solid/person';
import { tracked } from '@glimmer/tracking';

const { Fetcher, namedNode } = rdflib;

export default class EditorPluginsSaySolidEditCardComponent extends Component {
  @service profile;
  @service auth; 


  @tracked isEditMode = false; 

  @action
  toggleEdit(){
    this.isEditMode = ! this.isEditMode;
  }

  @action
  saveUser(){
    console.log("Save!");
  }
}
