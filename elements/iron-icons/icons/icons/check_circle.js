import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_check_circle = svg`<svg viewBox="0 0 24 24" id="check-circle"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g></svg>`;
export const check_circle = icons_check_circle;
iconMap["icons:check-circle"] = iconMap["check-circle"] = icons_check_circle;
