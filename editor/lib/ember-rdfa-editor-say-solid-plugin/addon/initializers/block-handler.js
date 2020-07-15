import {default as EditBlockHandler, EDIT_KEY} from '../utils/block-handlers/edit-block-handler';

export function initialize(application ) {
  application.register(EDIT_KEY, EditBlockHandler);
  application.inject('component', EDIT_KEY, EDIT_KEY);
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  initialize
}