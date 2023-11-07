import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_photo_camera = svg`<svg viewBox="0 0 24 24" id="photo-camera"><g><circle cx="12" cy="12" r="3.2"></circle><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path></g></svg>`;
export const photo_camera = image_photo_camera;
iconMap["image:photo-camera"] = iconMap["photo-camera"] = image_photo_camera;
