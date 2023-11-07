import {svg} from 'lit'
export const device_devices = svg`<svg viewBox="0 0 24 24" id="devices"><g><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"></path></g></svg>`;
export const devices = device_devices;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:devices"] = window.icons["devices"] = device_devices;
