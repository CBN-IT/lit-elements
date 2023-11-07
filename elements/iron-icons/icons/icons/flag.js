import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_flag = svg`<svg viewBox="0 0 24 24" id="flag"><g><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g></svg>`;
export const flag = icons_flag;
iconMap["icons:flag"] = iconMap["flag"] = icons_flag;
