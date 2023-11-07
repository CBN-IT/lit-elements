import {svg} from 'lit'
export const hardware_keyboard_arrow_down = svg`<svg viewBox="0 0 24 24" id="keyboard-arrow-down"><g><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path></g></svg>`;
export const keyboard_arrow_down = hardware_keyboard_arrow_down;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:keyboard-arrow-down"] = window.icons["keyboard-arrow-down"] = hardware_keyboard_arrow_down;
