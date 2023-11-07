import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const notification_sms_failed = svg`<svg viewBox="0 0 24 24" id="sms-failed"><g><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g></svg>`;
export const sms_failed = notification_sms_failed;
iconMap["notification:sms-failed"] = iconMap["sms-failed"] = notification_sms_failed;
