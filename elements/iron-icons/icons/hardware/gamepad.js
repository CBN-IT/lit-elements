import {svg} from 'lit'
export const hardware_gamepad = svg`<svg viewBox="0 0 24 24" id="gamepad"><g><path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"></path></g></svg>`;
export const gamepad = hardware_gamepad;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:gamepad"] = window.icons["gamepad"] = hardware_gamepad;
