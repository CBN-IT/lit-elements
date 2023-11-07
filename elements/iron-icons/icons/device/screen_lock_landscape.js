import {svg} from 'lit'
export const device_screen_lock_landscape = svg`<svg viewBox="0 0 24 24" id="screen-lock-landscape"><g><path d="M21 5H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-2 12H5V7h14v10zm-9-1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1v-1c0-1.11-.9-2-2-2-1.11 0-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm.8-6c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2v1h-2.4v-1z"></path></g></svg>`;
export const screen_lock_landscape = device_screen_lock_landscape;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:screen-lock-landscape"] = window.icons["screen-lock-landscape"] = device_screen_lock_landscape;
