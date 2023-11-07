import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const device_bluetooth_disabled = svg`<svg viewBox="0 0 24 24" id="bluetooth-disabled"><g><path d="M13 5.83l1.88 1.88-1.6 1.6 1.41 1.41 3.02-3.02L12 2h-1v5.03l2 2v-3.2zM5.41 4L4 5.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l4.29-4.29 2.3 2.29L20 18.59 5.41 4zM13 18.17v-3.76l1.88 1.88L13 18.17z"></path></g></svg>`;
export const bluetooth_disabled = device_bluetooth_disabled;
iconMap["device:bluetooth-disabled"] = iconMap["bluetooth-disabled"] = device_bluetooth_disabled;
