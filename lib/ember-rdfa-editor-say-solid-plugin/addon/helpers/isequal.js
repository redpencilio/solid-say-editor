import { helper } from '@ember/component/helper';

function isequal(args) {
  let [object1, object2] = args;
  return object1 === object2;
}

export default helper(isequal);