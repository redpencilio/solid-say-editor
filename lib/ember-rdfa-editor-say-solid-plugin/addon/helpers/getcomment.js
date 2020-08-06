import { helper } from '@ember/component/helper';
import rdflib from 'ember-rdflib';
const RDFS = rdflib.Namespace("http://www.w3.org/2000/01/rdf-schema#");

function getComment(args) {
  let [metadata, uri] = args;
  let comment = metadata[uri][RDFS("comment").value];
  if (comment) return comment;
  return uri;
}

export default helper(getComment);