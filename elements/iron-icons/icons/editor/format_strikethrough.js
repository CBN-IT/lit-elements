import {svg} from 'lit'
export const editor_format_strikethrough = svg`<svg viewBox="0 0 24 24" id="format-strikethrough"><g><path d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z"></path></g></svg>`;
export const format_strikethrough = editor_format_strikethrough;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-strikethrough"] = window.icons["format-strikethrough"] = editor_format_strikethrough;
