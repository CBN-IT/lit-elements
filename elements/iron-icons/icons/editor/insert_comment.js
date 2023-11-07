import {svg} from 'lit'
export const editor_insert_comment = svg`<svg viewBox="0 0 24 24" id="insert-comment"><g><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path></g></svg>`;
export const insert_comment = editor_insert_comment;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:insert-comment"] = window.icons["insert-comment"] = editor_insert_comment;
