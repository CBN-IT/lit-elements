import {svg} from 'lit'
export const icons_done = svg`<svg viewBox="0 0 24 24" id="done"><g><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path></g></svg>`;
export const done = icons_done;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:done"] = window.icons["done"] = icons_done;
