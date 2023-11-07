import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const cbn_generic = svg`<svg id="generic" viewBox="0 0 24 24"><g><path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"></path></g></svg>`;
export const generic = cbn_generic;
iconMap["cbn:generic"] = iconMap["generic"] = cbn_generic;
