import {svg} from 'lit'
export const device_gps_fixed = svg`<svg viewBox="0 0 24 24" id="gps-fixed"><g><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g></svg>`;
export const gps_fixed = device_gps_fixed;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:gps-fixed"] = window.icons["gps-fixed"] = device_gps_fixed;
