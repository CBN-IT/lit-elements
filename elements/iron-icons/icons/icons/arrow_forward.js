import {svg} from 'lit'
export const icons_arrow_forward = svg`<svg viewBox="0 0 24 24" id="arrow-forward"><g><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></g></svg>`;
export const arrow_forward = icons_arrow_forward;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:arrow-forward"] = window.icons["arrow-forward"] = icons_arrow_forward;
