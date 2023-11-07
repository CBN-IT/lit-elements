import {svg} from 'lit'
export const image_navigate_before = svg`<svg viewBox="0 0 24 24" id="navigate-before"><g><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g></svg>`;
export const navigate_before = image_navigate_before;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:navigate-before"] = window.icons["navigate-before"] = image_navigate_before;
