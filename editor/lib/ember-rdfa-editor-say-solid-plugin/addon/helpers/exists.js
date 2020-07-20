import { helper } from '@ember/component/helper';

function exists(args) {
  let [item] = args;
  return item !== undefined;
}

export default helper(exists);