import {svg} from 'lit'
export const icons_first_page = svg`<svg viewBox="0 0 24 24" id="first-page"><g><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path></g></svg>`;
export const first_page = icons_first_page;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:first-page"] = window.icons["first-page"] = icons_first_page;
