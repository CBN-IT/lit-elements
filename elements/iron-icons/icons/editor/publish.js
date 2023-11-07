import {svg} from 'lit'
export const editor_publish = svg`<svg viewBox="0 0 24 24" id="publish"><g><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"></path></g></svg>`;
export const publish = editor_publish;
if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:publish"] = window.icons["publish"] = editor_publish;
