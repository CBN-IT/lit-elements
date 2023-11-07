import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_check_box = svg`<svg viewBox="0 0 24 24" id="check-box"><g><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></g></svg>`;
export const check_box = icons_check_box;
iconMap["icons:check-box"] = iconMap["check-box"] = icons_check_box;
