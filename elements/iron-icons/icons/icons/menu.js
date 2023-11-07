import {svg} from 'lit'
export const icons_menu = svg`<svg viewBox="0 0 24 24" id="menu"><g><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g></svg>`;
export const menu = icons_menu;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:menu"] = window.icons["menu"] = icons_menu;
