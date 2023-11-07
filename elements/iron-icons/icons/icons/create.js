import {svg} from 'lit'
export const icons_create = svg`<svg viewBox="0 0 24 24" id="create"><g><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g></svg>`;
export const create = icons_create;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:create"] = window.icons["create"] = icons_create;
