import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_today = svg`<svg viewBox="0 0 24 24" id="today"><g><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path></g></svg>`;
export const today = icons_today;
iconMap["icons:today"] = iconMap["today"] = icons_today;
