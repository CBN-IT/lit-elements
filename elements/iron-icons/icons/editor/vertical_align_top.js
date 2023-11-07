import {svg} from 'lit'
export const editor_vertical_align_top = svg`<svg viewBox="0 0 24 24" id="vertical-align-top"><g><path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"></path></g></svg>`;
export const vertical_align_top = editor_vertical_align_top;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:vertical-align-top"] = window.icons["vertical-align-top"] = editor_vertical_align_top;
