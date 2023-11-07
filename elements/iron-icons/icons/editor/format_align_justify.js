import {svg} from 'lit'
export const editor_format_align_justify = svg`<svg viewBox="0 0 24 24" id="format-align-justify"><g><path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z"></path></g></svg>`;
export const format_align_justify = editor_format_align_justify;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-align-justify"] = window.icons["format-align-justify"] = editor_format_align_justify;
