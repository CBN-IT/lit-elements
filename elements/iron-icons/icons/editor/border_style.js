import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_border_style = svg`<svg viewBox="0 0 24 24" id="border-style"><g><path d="M15 21h2v-2h-2v2zm4 0h2v-2h-2v2zM7 21h2v-2H7v2zm4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zM3 3v18h2V5h16V3H3zm16 6h2V7h-2v2z"></path></g></svg>`;
export const border_style = editor_border_style;
iconMap["editor:border-style"] = iconMap["border-style"] = editor_border_style;
