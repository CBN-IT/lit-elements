import {svg} from 'lit'
export const icons_folder_shared = svg`<svg viewBox="0 0 24 24" id="folder-shared"><g><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z"></path></g></svg>`;
export const folder_shared = icons_folder_shared;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:folder-shared"] = window.icons["folder-shared"] = icons_folder_shared;
