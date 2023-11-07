import {svg} from 'lit'
export const icons_arrow_drop_up = svg`<svg viewBox="0 0 24 24" id="arrow-drop-up"><g><path d="M7 14l5-5 5 5z"></path></g></svg>`;
export const arrow_drop_up = icons_arrow_drop_up;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:arrow-drop-up"] = window.icons["arrow-drop-up"] = icons_arrow_drop_up;
