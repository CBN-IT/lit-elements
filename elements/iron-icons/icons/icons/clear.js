import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_clear = svg`<svg viewBox="0 0 24 24" id="clear"><g><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g></svg>`;
export const clear = icons_clear;
iconMap["icons:clear"] = iconMap["clear"] = icons_clear;
