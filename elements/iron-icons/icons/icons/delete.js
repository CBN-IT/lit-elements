import {svg} from 'lit'
export const icons_delete = svg`<svg viewBox="0 0 24 24" id="delete"><g><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></g></svg>`;
export const delete = icons_delete;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:delete"] = window.icons["delete"] = icons_delete;
