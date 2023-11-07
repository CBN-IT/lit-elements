import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const hardware_tablet = svg`<svg viewBox="0 0 24 24" id="tablet"><g><path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 1.99-.9 1.99-2L23 6c0-1.1-.9-2-2-2zm-2 14H5V6h14v12z"></path></g></svg>`;
export const tablet = hardware_tablet;
iconMap["hardware:tablet"] = iconMap["tablet"] = hardware_tablet;
