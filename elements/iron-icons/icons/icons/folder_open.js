import {svg} from 'lit'
export const icons_folder_open = svg`<svg viewBox="0 0 24 24" id="folder-open"><g><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"></path></g></svg>`;
export const folder_open = icons_folder_open;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:folder-open"] = window.icons["folder-open"] = icons_folder_open;
