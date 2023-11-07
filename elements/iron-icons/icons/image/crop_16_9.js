import {svg} from 'lit'
export const image_crop_16_9 = svg`<svg viewBox="0 0 24 24" id="crop-16-9"><g><path d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"></path></g></svg>`;
export const crop_16_9 = image_crop_16_9;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:crop-16-9"] = window.icons["crop-16-9"] = image_crop_16_9;
