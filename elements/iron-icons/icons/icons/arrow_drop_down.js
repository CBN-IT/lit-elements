import {svg} from 'lit'
export const icons_arrow_drop_down = svg`<svg viewBox="0 0 24 24" id="arrow-drop-down"><g><path d="M7 10l5 5 5-5z"></path></g></svg>`;
export const arrow_drop_down = icons_arrow_drop_down;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:arrow-drop-down"] = window.icons["arrow-drop-down"] = icons_arrow_drop_down;
