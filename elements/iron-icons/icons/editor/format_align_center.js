import {svg} from 'lit'
export const editor_format_align_center = svg`<svg viewBox="0 0 24 24" id="format-align-center"><g><path d="M7 15v2h10v-2H7zm-4 6h18v-2H3v2zm0-8h18v-2H3v2zm4-6v2h10V7H7zM3 3v2h18V3H3z"></path></g></svg>`;
export const format_align_center = editor_format_align_center;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-align-center"] = window.icons["format-align-center"] = editor_format_align_center;
