import {svg} from 'lit'
export const editor_space_bar = svg`<svg viewBox="0 0 24 24" id="space-bar"><g><path d="M18 9v4H6V9H4v6h16V9z"></path></g></svg>`;
export const space_bar = editor_space_bar;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:space-bar"] = window.icons["space-bar"] = editor_space_bar;
