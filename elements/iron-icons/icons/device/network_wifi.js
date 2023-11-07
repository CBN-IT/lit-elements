import {svg} from 'lit'
export const device_network_wifi = svg`<svg viewBox="0 0 24 24" id="network-wifi"><g><path fill-opacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path><path d="M3.53 10.95l8.46 10.54.01.01.01-.01 8.46-10.54C20.04 10.62 16.81 8 12 8c-4.81 0-8.04 2.62-8.47 2.95z"></path></g></svg>`;
export const network_wifi = device_network_wifi;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:network-wifi"] = window.icons["network-wifi"] = device_network_wifi;
