import {svg} from 'lit'
export const editor_border_all = svg`<svg viewBox="0 0 24 24" id="border-all"><g><path d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"></path></g></svg>`;
export const border_all = editor_border_all;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:border-all"] = window.icons["border-all"] = editor_border_all;
