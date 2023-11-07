import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const notification_power = svg`<svg viewBox="0 0 24 24" id="power"><g><path d="M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-1.99z"></path></g></svg>`;
export const power = notification_power;
iconMap["notification:power"] = iconMap["power"] = notification_power;
