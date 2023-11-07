import {svg} from 'lit'
export const hardware_keyboard_return = svg`<svg viewBox="0 0 24 24" id="keyboard-return"><g><path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"></path></g></svg>`;
export const keyboard_return = hardware_keyboard_return;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:keyboard-return"] = window.icons["keyboard-return"] = hardware_keyboard_return;
