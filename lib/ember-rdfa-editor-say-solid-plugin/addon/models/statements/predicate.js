import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import Node from './node';
export default class Predicate extends Node {
    @tracked node;
    @tracked label;
    @tracked description;
    @tracked quads = [];
    constructor(node, label, description){
        this.node = node;
        this.label = label;
        this.description = description;
    }

    addQuad(obj){
        this.quads = [ ...this.quads, obj ];
    }
}