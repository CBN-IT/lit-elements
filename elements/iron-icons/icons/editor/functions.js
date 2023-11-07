import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_functions = svg`<svg viewBox="0 0 24 24" id="functions"><g><path d="M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z"></path></g></svg>`;
export const functions = editor_functions;
iconMap["editor:functions"] = iconMap["functions"] = editor_functions;