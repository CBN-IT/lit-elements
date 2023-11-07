import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const notification_mms = svg`<svg viewBox="0 0 24 24" id="mms"><g><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM5 14l3.5-4.5 2.5 3.01L14.5 8l4.5 6H5z"></path></g></svg>`;
export const mms = notification_mms;
iconMap["notification:mms"] = iconMap["mms"] = notification_mms;
