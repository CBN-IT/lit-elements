import {svg} from 'lit'
export const device_brightness_low = svg`<svg viewBox="0 0 24 24" id="brightness-low"><g><path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path></g></svg>`;
export const brightness_low = device_brightness_low;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:brightness-low"] = window.icons["brightness-low"] = device_brightness_low;
