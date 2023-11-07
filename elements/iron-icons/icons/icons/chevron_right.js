import {svg} from 'lit'
export const icons_chevron_right = svg`<svg viewBox="0 0 24 24" id="chevron-right"><g><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g></svg>`;
export const chevron_right = icons_chevron_right;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:chevron-right"] = window.icons["chevron-right"] = icons_chevron_right;
