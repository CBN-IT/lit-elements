import {svg} from 'lit'
export const icons_turned_in = svg`<svg viewBox="0 0 24 24" id="turned-in"><g><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z"></path></g></svg>`;
export const turned_in = icons_turned_in;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:turned-in"] = window.icons["turned-in"] = icons_turned_in;
