import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_photo_library = svg`<svg viewBox="0 0 24 24" id="photo-library"><g><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"></path></g></svg>`;
export const photo_library = image_photo_library;
iconMap["image:photo-library"] = iconMap["photo-library"] = image_photo_library;
