import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const hardware_power_input = svg`<svg viewBox="0 0 24 24" id="power-input"><g><path d="M2 9v2h19V9H2zm0 6h5v-2H2v2zm7 0h5v-2H9v2zm7 0h5v-2h-5v2z"></path></g></svg>`;
export const power_input = hardware_power_input;
iconMap["hardware:power-input"] = iconMap["power-input"] = hardware_power_input;
