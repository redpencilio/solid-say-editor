import { tracked } from '@glimmer/tracking';

export default class Predicate {
    @tracked node;
    @tracked label;
    @tracked description;

    constructor(node, label, description){
        this.node = node;
        this.label = label;
        this.description = description;
    }
}