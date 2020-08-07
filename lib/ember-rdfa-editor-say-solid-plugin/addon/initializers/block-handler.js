import {default as EditInEditorBlockHandler, EDIT_EDITOR_KEY} from '../utils/block-handlers/edit-in-editor-block-handler';
import SaveResetBlockHandler,{ SAVE_RESET_KEY } from '../utils/block-handlers/save-reset-block-handler';

export function initialize(application ) {
  application.register(EDIT_EDITOR_KEY, EditInEditorBlockHandler);
  application.register(SAVE_RESET_KEY, SaveResetBlockHandler);
}

export default {
  initialize
}