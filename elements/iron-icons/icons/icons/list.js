import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_list = svg`<svg viewBox="0 0 24 24" id="list"><g><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></path></g></svg>`;
export const list = icons_list;
iconMap["icons:list"] = iconMap["list"] = icons_list;
