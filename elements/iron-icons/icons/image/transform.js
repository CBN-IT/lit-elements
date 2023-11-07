import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_transform = svg`<svg viewBox="0 0 24 24" id="transform"><g><path d="M22 18v-2H8V4h2L7 1 4 4h2v2H2v2h4v8c0 1.1.9 2 2 2h8v2h-2l3 3 3-3h-2v-2h4zM10 8h6v6h2V8c0-1.1-.9-2-2-2h-6v2z"></path></g></svg>`;
export const transform = image_transform;
iconMap["image:transform"] = iconMap["transform"] = image_transform;
