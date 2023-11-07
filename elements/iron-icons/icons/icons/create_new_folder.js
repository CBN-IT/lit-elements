import {svg} from 'lit'
export const icons_create_new_folder = svg`<svg viewBox="0 0 24 24" id="create-new-folder"><g><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"></path></g></svg>`;
export const create_new_folder = icons_create_new_folder;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:create-new-folder"] = window.icons["create-new-folder"] = icons_create_new_folder;
