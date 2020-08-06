import { helper } from '@ember/component/helper';

export function getSubjectName(args) {
  let [subject_uri] = args;
  return subject_uri.split("#")[1];
}

export default helper(getSubjectName);