import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_crop = svg`<svg viewBox="0 0 24 24" id="crop"><g><path d="M17 15h2V7c0-1.1-.9-2-2-2H9v2h8v8zM7 17V1H5v4H1v2h4v10c0 1.1.9 2 2 2h10v4h2v-4h4v-2H7z"></path></g></svg>`;
export const crop = image_crop;
iconMap["image:crop"] = iconMap["crop"] = image_crop;