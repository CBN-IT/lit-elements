import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const notification_event_note = svg`<svg viewBox="0 0 24 24" id="event-note"><g><path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z"></path></g></svg>`;
export const event_note = notification_event_note;
iconMap["notification:event-note"] = iconMap["event-note"] = notification_event_note;
