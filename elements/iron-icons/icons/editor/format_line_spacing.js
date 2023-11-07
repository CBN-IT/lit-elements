import {svg} from 'lit'
export const editor_format_line_spacing = svg`<svg viewBox="0 0 24 24" id="format-line-spacing"><g><path d="M6 7h2.5L5 3.5 1.5 7H4v10H1.5L5 20.5 8.5 17H6V7zm4-2v2h12V5H10zm0 14h12v-2H10v2zm0-6h12v-2H10v2z"></path></g></svg>`;
export const format_line_spacing = editor_format_line_spacing;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-line-spacing"] = window.icons["format-line-spacing"] = editor_format_line_spacing;
