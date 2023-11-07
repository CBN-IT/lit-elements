import {svg} from 'lit'
export const icons_add = svg`<svg viewBox="0 0 24 24" id="add"><g><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></g></svg>`;
export const add = icons_add;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:add"] = window.icons["add"] = icons_add;
