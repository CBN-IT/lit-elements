import {svg} from 'lit'
export const notification_event_available = svg`<svg viewBox="0 0 24 24" id="event-available"><g><path d="M16.53 11.06L15.47 10l-4.88 4.88-2.12-2.12-1.06 1.06L10.59 17l5.94-5.94zM19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"></path></g></svg>`;
export const event_available = notification_event_available;
if(window.icons === undefined){ window.icons = {}; }
window.icons["notification:event-available"] = window.icons["event-available"] = notification_event_available;
