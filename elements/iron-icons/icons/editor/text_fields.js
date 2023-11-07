import {svg} from 'lit'
export const editor_text_fields = svg`<svg viewBox="0 0 24 24" id="text-fields"><g><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"></path></g></svg>`;
export const text_fields = editor_text_fields;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:text-fields"] = window.icons["text-fields"] = editor_text_fields;
