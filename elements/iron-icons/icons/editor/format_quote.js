import {svg} from 'lit'
export const editor_format_quote = svg`<svg viewBox="0 0 24 24" id="format-quote"><g><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"></path></g></svg>`;
export const format_quote = editor_format_quote;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-quote"] = window.icons["format-quote"] = editor_format_quote;
