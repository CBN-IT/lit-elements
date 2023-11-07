import {svg} from 'lit'
export const device_screen_lock_portrait = svg`<svg viewBox="0 0 24 24" id="screen-lock-portrait"><g><path d="M10 16h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1v-1c0-1.11-.9-2-2-2-1.11 0-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm.8-6c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2v1h-2.4v-1zM17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"></path></g></svg>`;
export const screen_lock_portrait = device_screen_lock_portrait;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:screen-lock-portrait"] = window.icons["screen-lock-portrait"] = device_screen_lock_portrait;
