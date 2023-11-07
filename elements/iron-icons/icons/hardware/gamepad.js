import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const hardware_gamepad = svg`<svg viewBox="0 0 24 24" id="gamepad"><g><path d="M15 7.5V2H9v5.5l3 3 3-3zM7.5 9H2v6h5.5l3-3-3-3zM9 16.5V22h6v-5.5l-3-3-3 3zM16.5 9l-3 3 3 3H22V9h-5.5z"></path></g></svg>`;
export const gamepad = hardware_gamepad;
iconMap["hardware:gamepad"] = iconMap["gamepad"] = hardware_gamepad;
