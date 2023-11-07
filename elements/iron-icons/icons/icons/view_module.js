import {svg} from 'lit'
export const icons_view_module = svg`<svg viewBox="0 0 24 24" id="view-module"><g><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"></path></g></svg>`;
export const view_module = icons_view_module;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:view-module"] = window.icons["view-module"] = icons_view_module;
