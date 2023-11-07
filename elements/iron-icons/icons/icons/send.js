import {svg} from 'lit'
export const icons_send = svg`<svg viewBox="0 0 24 24" id="send"><g><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></g></svg>`;
export const send = icons_send;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:send"] = window.icons["send"] = icons_send;
