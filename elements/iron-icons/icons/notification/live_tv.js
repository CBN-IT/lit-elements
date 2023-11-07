import {svg} from 'lit'
export const notification_live_tv = svg`<svg viewBox="0 0 24 24" id="live-tv"><g><path d="M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3c-1.1 0-2 .89-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.11-.9-2-2-2zm0 14H3V8h18v12zM9 10v8l7-4z"></path></g></svg>`;
export const live_tv = notification_live_tv;
if(window.icons === undefined){ window.icons = {}; }
window.icons["notification:live-tv"] = window.icons["live-tv"] = notification_live_tv;
