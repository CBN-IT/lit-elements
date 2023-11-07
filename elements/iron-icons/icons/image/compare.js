import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_compare = svg`<svg viewBox="0 0 24 24" id="compare"><g><path d="M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v2h2V1h-2v2zm0 15H5l5-6v6zm9-15h-5v2h5v13l-5-6v9h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g></svg>`;
export const compare = image_compare;
iconMap["image:compare"] = iconMap["compare"] = image_compare;