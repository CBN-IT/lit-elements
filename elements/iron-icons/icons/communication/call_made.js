import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const communication_call_made = svg`<svg viewBox="0 0 24 24" id="call-made"><g><path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"></path></g></svg>`;
export const call_made = communication_call_made;
iconMap["communication:call-made"] = iconMap["call-made"] = communication_call_made;
