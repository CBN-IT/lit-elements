import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_error = svg`<svg viewBox="0 0 24 24" id="error"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></g></svg>`;
export const error = icons_error;
iconMap["icons:error"] = iconMap["error"] = icons_error;