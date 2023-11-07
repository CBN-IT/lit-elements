import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_add_a_photo = svg`<svg viewBox="0 0 24 24" id="add-a-photo"><g><path d="M3 4V1h2v3h3v2H5v3H3V6H0V4h3zm3 6V7h3V4h7l1.83 2H21c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10h3zm7 9c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-3.2-5c0 1.77 1.43 3.2 3.2 3.2s3.2-1.43 3.2-3.2-1.43-3.2-3.2-3.2-3.2 1.43-3.2 3.2z"></path></g></svg>`;
export const add_a_photo = image_add_a_photo;
iconMap["image:add-a-photo"] = iconMap["add-a-photo"] = image_add_a_photo;
