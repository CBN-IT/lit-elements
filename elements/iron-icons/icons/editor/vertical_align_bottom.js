import {svg} from 'lit'
export const editor_vertical_align_bottom = svg`<svg viewBox="0 0 24 24" id="vertical-align-bottom"><g><path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"></path></g></svg>`;
export const vertical_align_bottom = editor_vertical_align_bottom;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:vertical-align-bottom"] = window.icons["vertical-align-bottom"] = editor_vertical_align_bottom;
