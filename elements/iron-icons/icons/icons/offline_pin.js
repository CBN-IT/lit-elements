import {svg} from 'lit'
export const icons_offline_pin = svg`<svg viewBox="0 0 24 24" id="offline-pin"><g><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm5 16H7v-2h10v2zm-6.7-4L7 10.7l1.4-1.4 1.9 1.9 5.3-5.3L17 7.3 10.3 14z"></path></g></svg>`;
export const offline_pin = icons_offline_pin;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:offline-pin"] = window.icons["offline-pin"] = icons_offline_pin;
