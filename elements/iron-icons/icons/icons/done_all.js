import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_done_all = svg`<svg viewBox="0 0 24 24" id="done-all"><g><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path></g></svg>`;
export const done_all = icons_done_all;
iconMap["icons:done-all"] = iconMap["done-all"] = icons_done_all;
