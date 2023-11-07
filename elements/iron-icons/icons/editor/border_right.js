import {svg} from 'lit'
export const editor_border_right = svg`<svg viewBox="0 0 24 24" id="border-right"><g><path d="M7 21h2v-2H7v2zM3 5h2V3H3v2zm4 0h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2v-2H3v2zm8 0h2v-2h-2v2zm-8-8h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm8 8h2v-2h-2v2zm4-4h2v-2h-2v2zm4-10v18h2V3h-2zm-4 18h2v-2h-2v2zm0-16h2V3h-2v2zm-4 8h2v-2h-2v2zm0-8h2V3h-2v2zm0 4h2V7h-2v2z"></path></g></svg>`;
export const border_right = editor_border_right;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:border-right"] = window.icons["border-right"] = editor_border_right;
