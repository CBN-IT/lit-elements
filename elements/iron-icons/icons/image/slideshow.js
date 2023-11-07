import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_slideshow = svg`<svg viewBox="0 0 24 24" id="slideshow"><g><path d="M10 8v8l5-4-5-4zm9-5H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"></path></g></svg>`;
export const slideshow = image_slideshow;
iconMap["image:slideshow"] = iconMap["slideshow"] = image_slideshow;
