import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
export default class Predicate {
    @tracked node;
    @tracked label;
    @tracked description;
    @tracked targets = [];
    constructor(node, label, description){
        this.node = node;
        this.label = label;
        this.description = description;
    }

    addTarget(obj){
        this.targets = [ ...this.targets, obj ];
    }
}