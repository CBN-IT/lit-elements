import {svg} from 'lit'
export const icons_bookmark = svg`<svg viewBox="0 0 24 24" id="bookmark"><g><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g></svg>`;
export const bookmark = icons_bookmark;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:bookmark"] = window.icons["bookmark"] = icons_bookmark;
