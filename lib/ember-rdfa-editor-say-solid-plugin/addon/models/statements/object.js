import { tracked } from "@glimmer/tracking";
import Node from "./node";

export default class Object extends Node{
    @tracked
    datatType = undefined; 

}