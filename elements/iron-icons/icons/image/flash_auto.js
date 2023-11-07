import {svg} from 'lit'
export const image_flash_auto = svg`<svg viewBox="0 0 24 24" id="flash-auto"><g><path d="M3 2v12h3v9l7-12H9l4-9H3zm16 0h-2l-3.2 9h1.9l.7-2h3.2l.7 2h1.9L19 2zm-2.15 5.65L18 4l1.15 3.65h-2.3z"></path></g></svg>`;
export const flash_auto = image_flash_auto;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:flash-auto"] = window.icons["flash-auto"] = image_flash_auto;
