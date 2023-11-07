import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_title = svg`<svg viewBox="0 0 24 24" id="title"><g><path d="M5 4v3h5.5v12h3V7H19V4z"></path></g></svg>`;
export const title = editor_title;
iconMap["editor:title"] = iconMap["title"] = editor_title;
