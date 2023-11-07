import {svg} from 'lit'
export const device_dvr = svg`<svg viewBox="0 0 24 24" id="dvr"><g><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-2-9H8v2h11V8zm0 4H8v2h11v-2zM7 8H5v2h2V8zm0 4H5v2h2v-2z"></path></g></svg>`;
export const dvr = device_dvr;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:dvr"] = window.icons["dvr"] = device_dvr;
