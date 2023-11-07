import {svg} from 'lit'
export const image_flash_off = svg`<svg viewBox="0 0 24 24" id="flash-off"><g><path d="M3.27 3L2 4.27l5 5V13h3v9l3.58-6.14L17.73 20 19 18.73 3.27 3zM17 10h-4l4-8H7v2.18l8.46 8.46L17 10z"></path></g></svg>`;
export const flash_off = image_flash_off;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:flash-off"] = window.icons["flash-off"] = image_flash_off;
