import {svg} from 'lit'
export const editor_format_size = svg`<svg viewBox="0 0 24 24" id="format-size"><g><path d="M9 4v3h5v12h3V7h5V4H9zm-6 8h3v7h3v-7h3V9H3v3z"></path></g></svg>`;
export const format_size = editor_format_size;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:format-size"] = window.icons["format-size"] = editor_format_size;
