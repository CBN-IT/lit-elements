import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_space_bar = svg`<svg viewBox="0 0 24 24" id="space-bar"><g><path d="M18 9v4H6V9H4v6h16V9z"></path></g></svg>`;
export const space_bar = editor_space_bar;
iconMap["editor:space-bar"] = iconMap["space-bar"] = editor_space_bar;
