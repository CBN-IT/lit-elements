import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_cancel = svg`<svg viewBox="0 0 24 24" id="cancel"><g><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g></svg>`;
export const cancel = icons_cancel;
iconMap["icons:cancel"] = iconMap["cancel"] = icons_cancel;
