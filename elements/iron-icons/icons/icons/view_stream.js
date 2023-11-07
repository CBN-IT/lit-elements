import {svg} from 'lit'
export const icons_view_stream = svg`<svg viewBox="0 0 24 24" id="view-stream"><g><path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"></path></g></svg>`;
export const view_stream = icons_view_stream;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:view-stream"] = window.icons["view-stream"] = icons_view_stream;
