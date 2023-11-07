import {svg} from 'lit'
export const icons_polymer = svg`<svg viewBox="0 0 24 24" id="polymer"><g><path d="M19 4h-4L7.11 16.63 4.5 12 9 4H5L.5 12 5 20h4l7.89-12.63L19.5 12 15 20h4l4.5-8z"></path></g></svg>`;
export const polymer = icons_polymer;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:polymer"] = window.icons["polymer"] = icons_polymer;
