import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_remove = svg`<svg viewBox="0 0 24 24" id="remove"><g><path d="M19 13H5v-2h14v2z"></path></g></svg>`;
export const remove = icons_remove;
iconMap["icons:remove"] = iconMap["remove"] = icons_remove;
