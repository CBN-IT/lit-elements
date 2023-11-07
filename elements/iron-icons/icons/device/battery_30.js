import {svg} from 'lit'
export const device_battery_30 = svg`<svg viewBox="0 0 24 24" id="battery-30"><g><path fill-opacity=".3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V15h10V5.33z"></path><path d="M7 15v5.67C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V15H7z"></path></g></svg>`;
export const battery_30 = device_battery_30;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:battery-30"] = window.icons["battery-30"] = device_battery_30;
