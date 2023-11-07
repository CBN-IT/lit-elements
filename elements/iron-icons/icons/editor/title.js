import {svg} from 'lit'
export const editor_title = svg`<svg viewBox="0 0 24 24" id="title"><g><path d="M5 4v3h5.5v12h3V7H19V4z"></path></g></svg>`;
export const title = editor_title;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:title"] = window.icons["title"] = editor_title;
