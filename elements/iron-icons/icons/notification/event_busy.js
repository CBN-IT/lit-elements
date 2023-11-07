import {svg} from 'lit'
export const notification_event_busy = svg`<svg viewBox="0 0 24 24" id="event-busy"><g><path d="M9.31 17l2.44-2.44L14.19 17l1.06-1.06-2.44-2.44 2.44-2.44L14.19 10l-2.44 2.44L9.31 10l-1.06 1.06 2.44 2.44-2.44 2.44L9.31 17zM19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"></path></g></svg>`;
export const event_busy = notification_event_busy;
if(window.icons === undefined){ window.icons = {}; }
window.icons["notification:event-busy"] = window.icons["event-busy"] = notification_event_busy;
