import {svg} from 'lit'
export const image_crop_square = svg`<svg viewBox="0 0 24 24" id="crop-square"><g><path d="M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V6h12v12z"></path></g></svg>`;
export const crop_square = image_crop_square;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:crop-square"] = window.icons["crop-square"] = image_crop_square;
