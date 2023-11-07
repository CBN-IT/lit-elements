import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const device_battery_alert = svg`<svg viewBox="0 0 24 24" id="battery-alert"><g><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM13 18h-2v-2h2v2zm0-4h-2V9h2v5z"></path></g></svg>`;
export const battery_alert = device_battery_alert;
iconMap["device:battery-alert"] = iconMap["battery-alert"] = device_battery_alert;
