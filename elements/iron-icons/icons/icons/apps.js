import {svg} from 'lit'
export const icons_apps = svg`<svg viewBox="0 0 24 24" id="apps"><g><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></g></svg>`;
export const apps = icons_apps;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:apps"] = window.icons["apps"] = icons_apps;
