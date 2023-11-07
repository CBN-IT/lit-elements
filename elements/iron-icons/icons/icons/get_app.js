import {svg} from 'lit'
export const icons_get_app = svg`<svg viewBox="0 0 24 24" id="get-app"><g><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g></svg>`;
export const get_app = icons_get_app;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:get-app"] = window.icons["get-app"] = icons_get_app;
