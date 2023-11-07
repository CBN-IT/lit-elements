import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_border_left = svg`<svg viewBox="0 0 24 24" id="border-left"><g><path d="M11 21h2v-2h-2v2zm0-4h2v-2h-2v2zm0-12h2V3h-2v2zm0 4h2V7h-2v2zm0 4h2v-2h-2v2zm-4 8h2v-2H7v2zM7 5h2V3H7v2zm0 8h2v-2H7v2zm-4 8h2V3H3v18zM19 9h2V7h-2v2zm-4 12h2v-2h-2v2zm4-4h2v-2h-2v2zm0-14v2h2V3h-2zm0 10h2v-2h-2v2zm0 8h2v-2h-2v2zm-4-8h2v-2h-2v2zm0-8h2V3h-2v2z"></path></g></svg>`;
export const border_left = editor_border_left;
iconMap["editor:border-left"] = iconMap["border-left"] = editor_border_left;
