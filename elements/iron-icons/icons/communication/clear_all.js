import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const communication_clear_all = svg`<svg viewBox="0 0 24 24" id="clear-all"><g><path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"></path></g></svg>`;
export const clear_all = communication_clear_all;
iconMap["communication:clear-all"] = iconMap["clear-all"] = communication_clear_all;
