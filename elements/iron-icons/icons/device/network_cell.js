import {svg} from 'lit'
export const device_network_cell = svg`<svg viewBox="0 0 24 24" id="network-cell"><g><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M17 7L2 22h15z"></path></g></svg>`;
export const network_cell = device_network_cell;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:network-cell"] = window.icons["network-cell"] = device_network_cell;
