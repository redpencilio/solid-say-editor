import { action } from '@ember/object';
import { reads, not } from '@ember/object/computed';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import rdflib from 'ember-rdflib';
import SolidPersonModel from '../../models/solid/person';

const { Fetcher, namedNode } = rdflib;

export default class EditorPluginsSaySolidEditCardComponent extends Component {

}
