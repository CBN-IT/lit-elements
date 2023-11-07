import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_check = svg`<svg viewBox="0 0 24 24" id="check"><g><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g></svg>`;
export const check = icons_check;
iconMap["icons:check"] = iconMap["check"] = icons_check;
