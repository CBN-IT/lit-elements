import {svg} from 'lit'
export const editor_border_vertical = svg`<svg viewBox="0 0 24 24" id="border-vertical"><g><path d="M3 9h2V7H3v2zm0-4h2V3H3v2zm4 16h2v-2H7v2zm0-8h2v-2H7v2zm-4 0h2v-2H3v2zm0 8h2v-2H3v2zm0-4h2v-2H3v2zM7 5h2V3H7v2zm12 12h2v-2h-2v2zm-8 4h2V3h-2v18zm8 0h2v-2h-2v2zm0-8h2v-2h-2v2zm0-10v2h2V3h-2zm0 6h2V7h-2v2zm-4-4h2V3h-2v2zm0 16h2v-2h-2v2zm0-8h2v-2h-2v2z"></path></g></svg>`;
export const border_vertical = editor_border_vertical;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:border-vertical"] = window.icons["border-vertical"] = editor_border_vertical;
