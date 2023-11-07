import {svg} from 'lit'
export const icons_remove = svg`<svg viewBox="0 0 24 24" id="remove"><g><path d="M19 13H5v-2h14v2z"></path></g></svg>`;
export const remove = icons_remove;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:remove"] = window.icons["remove"] = icons_remove;
