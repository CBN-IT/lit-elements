import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_add_to_photos = svg`<svg viewBox="0 0 24 24" id="add-to-photos"><g><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"></path></g></svg>`;
export const add_to_photos = image_add_to_photos;
iconMap["image:add-to-photos"] = iconMap["add-to-photos"] = image_add_to_photos;
