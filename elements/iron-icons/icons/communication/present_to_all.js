import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const communication_present_to_all = svg`<svg viewBox="0 0 24 24" id="present-to-all"><g><path d="M21 3H3c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 16.02H3V4.98h18v14.04zM10 12H8l4-4 4 4h-2v4h-4v-4z"></path></g></svg>`;
export const present_to_all = communication_present_to_all;
iconMap["communication:present-to-all"] = iconMap["present-to-all"] = communication_present_to_all;
