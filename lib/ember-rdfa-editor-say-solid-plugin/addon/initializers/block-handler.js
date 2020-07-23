import {default as EditInEditorBlockHandler, EDIT_EDITOR_KEY} from '../utils/block-handlers/edit-in-editor-block-handler';
import SaveBlockHandler, { SAVE_KEY } from '../utils/block-handlers/save-block-handler';
import ResetBlockHandler, { RESET_KEY } from '../utils/block-handlers/reset-block-handler';

export function initialize(application ) {
  application.register(EDIT_EDITOR_KEY, EditInEditorBlockHandler);
  application.register(SAVE_KEY, SaveBlockHandler);
  application.register(RESET_KEY, ResetBlockHandler);
}

export default {
  initialize
}