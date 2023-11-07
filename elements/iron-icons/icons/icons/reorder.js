import {svg} from 'lit'
export const icons_reorder = svg`<svg viewBox="0 0 24 24" id="reorder"><g><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"></path></g></svg>`;
export const reorder = icons_reorder;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:reorder"] = window.icons["reorder"] = icons_reorder;
