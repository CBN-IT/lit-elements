import {svg} from 'lit'
export const communication_clear_all = svg`<svg viewBox="0 0 24 24" id="clear-all"><g><path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"></path></g></svg>`;
export const clear_all = communication_clear_all;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:clear-all"] = window.icons["clear-all"] = communication_clear_all;
