import {svg} from 'lit'
export const hardware_keyboard_arrow_up = svg`<svg viewBox="0 0 24 24" id="keyboard-arrow-up"><g><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></g></svg>`;
export const keyboard_arrow_up = hardware_keyboard_arrow_up;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:keyboard-arrow-up"] = window.icons["keyboard-arrow-up"] = hardware_keyboard_arrow_up;
