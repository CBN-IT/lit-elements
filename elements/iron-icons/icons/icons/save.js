import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_save = svg`<svg viewBox="0 0 24 24" id="save"><g><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"></path></g></svg>`;
export const save = icons_save;
iconMap["icons:save"] = iconMap["save"] = icons_save;