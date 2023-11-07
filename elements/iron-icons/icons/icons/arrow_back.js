import {svg} from 'lit'
export const icons_arrow_back = svg`<svg viewBox="0 0 24 24" id="arrow-back"><g><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></g></svg>`;
export const arrow_back = icons_arrow_back;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:arrow-back"] = window.icons["arrow-back"] = icons_arrow_back;
