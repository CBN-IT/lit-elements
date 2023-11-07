import {svg} from 'lit'
export const hardware_scanner = svg`<svg viewBox="0 0 24 24" id="scanner"><g><path d="M19.8 10.7L4.2 5l-.7 1.9L17.6 12H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-5.5c0-.8-.5-1.6-1.2-1.8zM7 17H5v-2h2v2zm12 0H9v-2h10v2z"></path></g></svg>`;
export const scanner = hardware_scanner;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:scanner"] = window.icons["scanner"] = hardware_scanner;
