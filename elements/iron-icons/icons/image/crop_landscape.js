import {svg} from 'lit'
export const image_crop_landscape = svg`<svg viewBox="0 0 24 24" id="crop-landscape"><g><path d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"></path></g></svg>`;
export const crop_landscape = image_crop_landscape;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:crop-landscape"] = window.icons["crop-landscape"] = image_crop_landscape;
