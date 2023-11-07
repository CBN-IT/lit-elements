import {svg} from 'lit'
export const notification_do_not_disturb_on = svg`<svg viewBox="0 0 24 24" id="do-not-disturb-on"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g></svg>`;
export const do_not_disturb_on = notification_do_not_disturb_on;
if(window.icons === undefined){ window.icons = {}; }
window.icons["notification:do-not-disturb-on"] = window.icons["do-not-disturb-on"] = notification_do_not_disturb_on;
