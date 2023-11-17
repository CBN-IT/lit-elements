import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const device_access_alarms = svg`<svg viewBox="0 0 24 24" id="access-alarms"><g><path d="M22 5.7l-4.6-3.9-1.3 1.5 4.6 3.9L22 5.7zM7.9 3.4L6.6 1.9 2 5.7l1.3 1.5 4.6-3.8zM12.5 8H11v6l4.7 2.9.8-1.2-4-2.4V8zM12 4c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"></path></g></svg>`;
export const access_alarms = device_access_alarms;
iconMap["device:access-alarms"] = iconMap["access-alarms"] = device_access_alarms;