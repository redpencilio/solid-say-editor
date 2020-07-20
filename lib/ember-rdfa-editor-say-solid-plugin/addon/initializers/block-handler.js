import {default as EditBlockHandler, EDIT_KEY} from '../utils/block-handlers/edit-block-handler';
import {default as EditInEditorBlockHandler, EDIT_EDITOR_KEY} from '../utils/block-handlers/edit-in-editor-block-handler';
import SaveBlockHandler, { SAVE_KEY } from '../utils/block-handlers/save-block-handler';

export function initialize(application ) {
  application.register(EDIT_KEY, EditBlockHandler);
  application.register(EDIT_EDITOR_KEY, EditInEditorBlockHandler);
  application.register(SAVE_KEY, SaveBlockHandler);
}

export default {
  initialize
}