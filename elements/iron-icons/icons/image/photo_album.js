import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_photo_album = svg`<svg viewBox="0 0 24 24" id="photo-album"><g><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4zm0 15l3-3.86 2.14 2.58 3-3.86L18 19H6z"></path></g></svg>`;
export const photo_album = image_photo_album;
iconMap["image:photo-album"] = iconMap["photo-album"] = image_photo_album;