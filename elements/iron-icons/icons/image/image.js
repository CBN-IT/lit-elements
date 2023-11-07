import {svg} from 'lit'
export const image_image = svg`<svg viewBox="0 0 24 24" id="image"><g><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></g></svg>`;
export const image = image_image;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:image"] = window.icons["image"] = image_image;
