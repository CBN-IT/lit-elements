import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const device_location_searching = svg`<svg viewBox="0 0 24 24" id="location-searching"><g><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></g></svg>`;
export const location_searching = device_location_searching;
iconMap["device:location-searching"] = iconMap["location-searching"] = device_location_searching;
