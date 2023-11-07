import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const notification_vibration = svg`<svg viewBox="0 0 24 24" id="vibration"><g><path d="M0 15h2V9H0v6zm3 2h2V7H3v10zm19-8v6h2V9h-2zm-3 8h2V7h-2v10zM16.5 3h-9C6.67 3 6 3.67 6 4.5v15c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5zM16 19H8V5h8v14z"></path></g></svg>`;
export const vibration = notification_vibration;
iconMap["notification:vibration"] = iconMap["vibration"] = notification_vibration;
