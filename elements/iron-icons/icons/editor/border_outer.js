import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_border_outer = svg`<svg viewBox="0 0 24 24" id="border-outer"><g><path d="M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm4 0h-2v2h2v-2zM3 3v18h18V3H3zm16 16H5V5h14v14zm-6-4h-2v2h2v-2zm-4-4H7v2h2v-2z"></path></g></svg>`;
export const border_outer = editor_border_outer;
iconMap["editor:border-outer"] = iconMap["border-outer"] = editor_border_outer;
