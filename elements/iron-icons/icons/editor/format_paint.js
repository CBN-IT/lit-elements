import {svg} from 'lit'
export const editor_format_paint = svg`<svg viewBox="0 0 24 24" id="format-paint"><g><path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6h1v4H9v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8V4h-3z"></path></g></svg>`;
export const format_paint = editor_format_paint;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-paint"] = window.icons["format-paint"] = editor_format_paint;
