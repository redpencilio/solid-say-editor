import { helper } from '@ember/component/helper';
import rdflib from 'ember-rdflib';
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#");

export function getLabel(args) {
  let [metadata, uri] = args;
  let label = metadata[uri][RDFS("label").value];
  if (label) return label;
  return uri;
}

export default helper(getLabel);