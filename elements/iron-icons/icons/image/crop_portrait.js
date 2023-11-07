import {svg} from 'lit'
export const image_crop_portrait = svg`<svg viewBox="0 0 24 24" id="crop-portrait"><g><path d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z"></path></g></svg>`;
export const crop_portrait = image_crop_portrait;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:crop-portrait"] = window.icons["crop-portrait"] = image_crop_portrait;
