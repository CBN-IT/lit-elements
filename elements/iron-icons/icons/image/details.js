import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_details = svg`<svg viewBox="0 0 24 24" id="details"><g><path d="M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z"></path></g></svg>`;
export const details = image_details;
iconMap["image:details"] = iconMap["details"] = image_details;