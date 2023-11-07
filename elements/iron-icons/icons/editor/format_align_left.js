import {svg} from 'lit'
export const editor_format_align_left = svg`<svg viewBox="0 0 24 24" id="format-align-left"><g><path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z"></path></g></svg>`;
export const format_align_left = editor_format_align_left;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-align-left"] = window.icons["format-align-left"] = editor_format_align_left;
