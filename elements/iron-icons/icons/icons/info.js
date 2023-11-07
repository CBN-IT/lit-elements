import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_info = svg`<svg viewBox="0 0 24 24" id="info"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></g></svg>`;
export const info = icons_info;
iconMap["icons:info"] = iconMap["info"] = icons_info;
