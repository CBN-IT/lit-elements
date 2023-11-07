import {svg} from 'lit'
export const image_switch_camera = svg`<svg viewBox="0 0 24 24" id="switch-camera"><g><path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5V13H9v2.5L5.5 12 9 8.5V11h6V8.5l3.5 3.5-3.5 3.5z"></path></g></svg>`;
export const switch_camera = image_switch_camera;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:switch-camera"] = window.icons["switch-camera"] = image_switch_camera;
