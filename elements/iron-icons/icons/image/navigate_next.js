import {svg} from 'lit'
export const image_navigate_next = svg`<svg viewBox="0 0 24 24" id="navigate-next"><g><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g></svg>`;
export const navigate_next = image_navigate_next;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:navigate-next"] = window.icons["navigate-next"] = image_navigate_next;
