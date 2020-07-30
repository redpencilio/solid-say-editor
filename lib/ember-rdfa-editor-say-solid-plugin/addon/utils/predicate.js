import { tracked } from '@glimmer/tracking';

export default class Predicate {
    @tracked node;
    @tracked label;
    @tracked description;
    @tracked target;
    constructor(node, label, description, target){
        this.node = node;
        this.label = label;
        this.description = description;
        this.target = target;
    }
}