import {svg} from 'lit'
export const editor_vertical_align_center = svg`<svg viewBox="0 0 24 24" id="vertical-align-center"><g><path d="M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z"></path></g></svg>`;
export const vertical_align_center = editor_vertical_align_center;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:vertical-align-center"] = window.icons["vertical-align-center"] = editor_vertical_align_center;
