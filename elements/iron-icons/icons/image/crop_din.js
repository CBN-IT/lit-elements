import {svg} from 'lit'
export const image_crop_din = svg`<svg viewBox="0 0 24 24" id="crop-din"><g><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"></path></g></svg>`;
export const crop_din = image_crop_din;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:crop-din"] = window.icons["crop-din"] = image_crop_din;
