import {svg} from 'lit'
export const hardware_keyboard_arrow_left = svg`<svg viewBox="0 0 24 24" id="keyboard-arrow-left"><g><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path></g></svg>`;
export const keyboard_arrow_left = hardware_keyboard_arrow_left;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:keyboard-arrow-left"] = window.icons["keyboard-arrow-left"] = hardware_keyboard_arrow_left;
