import {svg} from 'lit'
export const device_graphic_eq = svg`<svg viewBox="0 0 24 24" id="graphic-eq"><g><path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z"></path></g></svg>`;
export const graphic_eq = device_graphic_eq;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:graphic-eq"] = window.icons["graphic-eq"] = device_graphic_eq;
