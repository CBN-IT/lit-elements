import {svg} from 'lit'
export const icons_view_array = svg`<svg viewBox="0 0 24 24" id="view-array"><g><path d="M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z"></path></g></svg>`;
export const view_array = icons_view_array;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:view-array"] = window.icons["view-array"] = icons_view_array;
