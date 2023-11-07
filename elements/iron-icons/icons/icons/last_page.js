import {svg} from 'lit'
export const icons_last_page = svg`<svg viewBox="0 0 24 24" id="last-page"><g><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path></g></svg>`;
export const last_page = icons_last_page;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:last-page"] = window.icons["last-page"] = icons_last_page;
