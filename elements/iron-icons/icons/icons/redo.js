import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_redo = svg`<svg viewBox="0 0 24 24" id="redo"><g><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"></path></g></svg>`;
export const redo = icons_redo;
iconMap["icons:redo"] = iconMap["redo"] = icons_redo;