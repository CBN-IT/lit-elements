import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const device_network_cell = svg`<svg viewBox="0 0 24 24" id="network-cell"><g><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M17 7L2 22h15z"></path></g></svg>`;
export const network_cell = device_network_cell;
iconMap["device:network-cell"] = iconMap["network-cell"] = device_network_cell;
