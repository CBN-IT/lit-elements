import {svg} from 'lit'
export const icons_settings_cell = svg`<svg viewBox="0 0 24 24" id="settings-cell"><g><path d="M7 24h2v-2H7v2zm4 0h2v-2h-2v2zm4 0h2v-2h-2v2zM16 .01L8 0C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V2c0-1.1-.9-1.99-2-1.99zM16 16H8V4h8v12z"></path></g></svg>`;
export const settings_cell = icons_settings_cell;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:settings-cell"] = window.icons["settings-cell"] = icons_settings_cell;
