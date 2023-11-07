import {svg} from 'lit'
export const icons_reply = svg`<svg viewBox="0 0 24 24" id="reply"><g><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g></svg>`;
export const reply = icons_reply;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:reply"] = window.icons["reply"] = icons_reply;
