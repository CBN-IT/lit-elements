import {svg} from 'lit'
export const icons_check = svg`<svg viewBox="0 0 24 24" id="check"><g><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g></svg>`;
export const check = icons_check;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:check"] = window.icons["check"] = icons_check;
