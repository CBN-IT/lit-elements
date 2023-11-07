import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const hardware_device_hub = svg`<svg viewBox="0 0 24 24" id="device-hub"><g><path d="M17 16l-4-4V8.82C14.16 8.4 15 7.3 15 6c0-1.66-1.34-3-3-3S9 4.34 9 6c0 1.3.84 2.4 2 2.82V12l-4 4H3v5h5v-3.05l4-4.2 4 4.2V21h5v-5h-4z"></path></g></svg>`;
export const device_hub = hardware_device_hub;
iconMap["hardware:device-hub"] = iconMap["device-hub"] = hardware_device_hub;
