import {svg} from 'lit'
export const icons_arrow_upward = svg`<svg viewBox="0 0 24 24" id="arrow-upward"><g><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path></g></svg>`;
export const arrow_upward = icons_arrow_upward;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:arrow-upward"] = window.icons["arrow-upward"] = icons_arrow_upward;
