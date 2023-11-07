import {svg} from 'lit'
export const hardware_keyboard_tab = svg`<svg viewBox="0 0 24 24" id="keyboard-tab"><g><path d="M11.59 7.41L15.17 11H1v2h14.17l-3.59 3.59L13 18l6-6-6-6-1.41 1.41zM20 6v12h2V6h-2z"></path></g></svg>`;
export const keyboard_tab = hardware_keyboard_tab;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:keyboard-tab"] = window.icons["keyboard-tab"] = hardware_keyboard_tab;
