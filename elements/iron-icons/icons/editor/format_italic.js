import {svg} from 'lit'
export const editor_format_italic = svg`<svg viewBox="0 0 24 24" id="format-italic"><g><path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4z"></path></g></svg>`;
export const format_italic = editor_format_italic;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-italic"] = window.icons["format-italic"] = editor_format_italic;
