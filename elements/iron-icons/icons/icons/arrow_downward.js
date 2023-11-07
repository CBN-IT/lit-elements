import {svg} from 'lit'
export const icons_arrow_downward = svg`<svg viewBox="0 0 24 24" id="arrow-downward"><g><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path></g></svg>`;
export const arrow_downward = icons_arrow_downward;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:arrow-downward"] = window.icons["arrow-downward"] = icons_arrow_downward;
