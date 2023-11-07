import {svg} from 'lit'
export const editor_short_text = svg`<svg viewBox="0 0 24 24" id="short-text"><g><path d="M4 9h16v2H4zm0 4h10v2H4z"></path></g></svg>`;
export const short_text = editor_short_text;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:short-text"] = window.icons["short-text"] = editor_short_text;
