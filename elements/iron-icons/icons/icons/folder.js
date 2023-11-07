import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_folder = svg`<svg viewBox="0 0 24 24" id="folder"><g><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></g></svg>`;
export const folder = icons_folder;
iconMap["icons:folder"] = iconMap["folder"] = icons_folder;
