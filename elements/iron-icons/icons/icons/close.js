import {svg} from 'lit'
export const icons_close = svg`<svg viewBox="0 0 24 24" id="close"><g><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g></svg>`;
export const close = icons_close;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:close"] = window.icons["close"] = icons_close;
