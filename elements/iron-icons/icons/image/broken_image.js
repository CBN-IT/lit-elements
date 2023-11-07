import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_broken_image = svg`<svg viewBox="0 0 24 24" id="broken-image"><g><path d="M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42l3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z"></path></g></svg>`;
export const broken_image = image_broken_image;
iconMap["image:broken-image"] = iconMap["broken-image"] = image_broken_image;
