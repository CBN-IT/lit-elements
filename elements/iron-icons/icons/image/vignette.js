import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_vignette = svg`<svg viewBox="0 0 24 24" id="vignette"><g><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 15c-4.42 0-8-2.69-8-6s3.58-6 8-6 8 2.69 8 6-3.58 6-8 6z"></path></g></svg>`;
export const vignette = image_vignette;
iconMap["image:vignette"] = iconMap["vignette"] = image_vignette;