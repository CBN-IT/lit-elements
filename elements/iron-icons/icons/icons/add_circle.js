import {svg} from 'lit'
export const icons_add_circle = svg`<svg viewBox="0 0 24 24" id="add-circle"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path></g></svg>`;
export const add_circle = icons_add_circle;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:add-circle"] = window.icons["add-circle"] = icons_add_circle;
