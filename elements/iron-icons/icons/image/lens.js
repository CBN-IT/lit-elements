import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_lens = svg`<svg viewBox="0 0 24 24" id="lens"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path></g></svg>`;
export const lens = image_lens;
iconMap["image:lens"] = iconMap["lens"] = image_lens;
