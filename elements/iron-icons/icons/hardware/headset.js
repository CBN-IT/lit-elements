import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const hardware_headset = svg`<svg viewBox="0 0 24 24" id="headset"><g><path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"></path></g></svg>`;
export const headset = hardware_headset;
iconMap["hardware:headset"] = iconMap["headset"] = hardware_headset;
