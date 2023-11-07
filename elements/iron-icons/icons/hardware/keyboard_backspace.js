import {svg} from 'lit'
export const hardware_keyboard_backspace = svg`<svg viewBox="0 0 24 24" id="keyboard-backspace"><g><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"></path></g></svg>`;
export const keyboard_backspace = hardware_keyboard_backspace;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:keyboard-backspace"] = window.icons["keyboard-backspace"] = hardware_keyboard_backspace;
