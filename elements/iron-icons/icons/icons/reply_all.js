import {svg} from 'lit'
export const icons_reply_all = svg`<svg viewBox="0 0 24 24" id="reply-all"><g><path d="M7 8V5l-7 7 7 7v-3l-4-4 4-4zm6 1V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"></path></g></svg>`;
export const reply_all = icons_reply_all;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:reply-all"] = window.icons["reply-all"] = icons_reply_all;
