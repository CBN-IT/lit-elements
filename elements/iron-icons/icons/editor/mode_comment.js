import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_mode_comment = svg`<svg viewBox="0 0 24 24" id="mode-comment"><g><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"></path></g></svg>`;
export const mode_comment = editor_mode_comment;
iconMap["editor:mode-comment"] = iconMap["mode-comment"] = editor_mode_comment;
