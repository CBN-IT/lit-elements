import {svg} from 'lit'
export const icons_open_in_new = svg`<svg viewBox="0 0 24 24" id="open-in-new"><g><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></g></svg>`;
export const open_in_new = icons_open_in_new;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:open-in-new"] = window.icons["open-in-new"] = icons_open_in_new;
