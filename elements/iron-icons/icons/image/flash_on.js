import {svg} from 'lit'
export const image_flash_on = svg`<svg viewBox="0 0 24 24" id="flash-on"><g><path d="M7 2v11h3v9l7-12h-4l4-8z"></path></g></svg>`;
export const flash_on = image_flash_on;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:flash-on"] = window.icons["flash-on"] = image_flash_on;
