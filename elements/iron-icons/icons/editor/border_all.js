import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_border_all = svg`<svg viewBox="0 0 24 24" id="border-all"><g><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"></path></g></svg>`;
export const border_all = editor_border_all;
iconMap["editor:border-all"] = iconMap["border-all"] = editor_border_all;
