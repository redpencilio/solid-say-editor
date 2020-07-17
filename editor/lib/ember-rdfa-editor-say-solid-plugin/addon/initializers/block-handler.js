import {default as EditBlockHandler, EDIT_KEY} from '../utils/block-handlers/edit-block-handler';
import {default as EditInEditorBlockHandler, EDIT_EDITOR_KEY} from '../utils/block-handlers/edit-in-editor-block-handler';

export function initialize(application ) {
  application.register(EDIT_KEY, EditBlockHandler);
  application.register(EDIT_EDITOR_KEY, EditInEditorBlockHandler);
  // application.inject('route', 'foo', 'service:foo');
}

export default {
  initialize
}