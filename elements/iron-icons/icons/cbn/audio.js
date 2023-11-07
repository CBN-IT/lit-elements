import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const cbn_audio = svg`<svg id="audio" viewBox="0 0 24 24"><g><path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M9,16A2,2 0 0,0 7,18A2,2 0 0,0 9,20A2,2 0 0,0 11,18V13H14V11H10V16.27C9.71,16.1 9.36,16 9,16Z"></path></g></svg>`;
export const audio = cbn_audio;
iconMap["cbn:audio"] = iconMap["audio"] = cbn_audio;
