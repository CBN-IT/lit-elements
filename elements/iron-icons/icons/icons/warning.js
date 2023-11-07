import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_warning = svg`<svg viewBox="0 0 24 24" id="warning"><g><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g></svg>`;
export const warning = icons_warning;
iconMap["icons:warning"] = iconMap["warning"] = icons_warning;