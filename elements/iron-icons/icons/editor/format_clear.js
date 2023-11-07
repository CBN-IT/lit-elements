import {svg} from 'lit'
export const editor_format_clear = svg`<svg viewBox="0 0 24 24" id="format-clear"><g><path d="M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21 18 19.73 3.55 5.27 3.27 5zM6 5v.18L8.82 8h2.4l-.72 1.68 2.1 2.1L14.21 8H20V5H6z"></path></g></svg>`;
export const format_clear = editor_format_clear;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-clear"] = window.icons["format-clear"] = editor_format_clear;
