import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_remove_circle = svg`<svg viewBox="0 0 24 24" id="remove-circle"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></g></svg>`;
export const remove_circle = icons_remove_circle;
iconMap["icons:remove-circle"] = iconMap["remove-circle"] = icons_remove_circle;
