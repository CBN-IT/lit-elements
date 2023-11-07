import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_flip = svg`<svg viewBox="0 0 24 24" id="flip"><g><path d="M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"></path></g></svg>`;
export const flip = image_flip;
iconMap["image:flip"] = iconMap["flip"] = image_flip;
