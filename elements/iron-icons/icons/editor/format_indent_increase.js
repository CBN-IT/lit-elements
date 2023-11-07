import {svg} from 'lit'
export const editor_format_indent_increase = svg`<svg viewBox="0 0 24 24" id="format-indent-increase"><g><path d="M3 21h18v-2H3v2zM3 8v8l4-4-4-4zm8 9h10v-2H11v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"></path></g></svg>`;
export const format_indent_increase = editor_format_indent_increase;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-indent-increase"] = window.icons["format-indent-increase"] = editor_format_indent_increase;
