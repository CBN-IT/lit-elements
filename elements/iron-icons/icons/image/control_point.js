import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_control_point = svg`<svg viewBox="0 0 24 24" id="control-point"><g><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g></svg>`;
export const control_point = image_control_point;
iconMap["image:control-point"] = iconMap["control-point"] = image_control_point;
