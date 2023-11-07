import {svg} from 'lit'
export const editor_drag_handle = svg`<svg viewBox="0 0 24 24" id="drag-handle"><g><path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"></path></g></svg>`;
export const drag_handle = editor_drag_handle;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:drag-handle"] = window.icons["drag-handle"] = editor_drag_handle;
