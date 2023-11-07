import {svg} from 'lit'
export const icons_view_column = svg`<svg viewBox="0 0 24 24" id="view-column"><g><path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"></path></g></svg>`;
export const view_column = icons_view_column;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:view-column"] = window.icons["view-column"] = icons_view_column;
