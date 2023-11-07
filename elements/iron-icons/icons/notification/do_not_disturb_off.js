import {svg} from 'lit'
export const notification_do_not_disturb_off = svg`<svg viewBox="0 0 24 24" id="do-not-disturb-off"><g><path d="M17 11v2h-1.46l4.68 4.68C21.34 16.07 22 14.11 22 12c0-5.52-4.48-10-10-10-2.11 0-4.07.66-5.68 1.78L13.54 11H17zM2.27 2.27L1 3.54l2.78 2.78C2.66 7.93 2 9.89 2 12c0 5.52 4.48 10 10 10 2.11 0 4.07-.66 5.68-1.78L20.46 23l1.27-1.27L11 11 2.27 2.27zM7 13v-2h1.46l2 2H7z"></path></g></svg>`;
export const do_not_disturb_off = notification_do_not_disturb_off;
if(window.icons === undefined){ window.icons = {}; }
window.icons["notification:do-not-disturb-off"] = window.icons["do-not-disturb-off"] = notification_do_not_disturb_off;
