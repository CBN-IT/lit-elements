import {svg} from 'lit'
export const icons_chevron_left = svg`<svg viewBox="0 0 24 24" id="chevron-left"><g><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g></svg>`;
export const chevron_left = icons_chevron_left;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:chevron-left"] = window.icons["chevron-left"] = icons_chevron_left;
