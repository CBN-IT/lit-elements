import {svg} from 'lit'
export const communication_comment = svg`<svg viewBox="0 0 24 24" id="comment"><g><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path></g></svg>`;
export const comment = communication_comment;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:comment"] = window.icons["comment"] = communication_comment;
