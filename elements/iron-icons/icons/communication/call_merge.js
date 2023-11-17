import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const communication_call_merge = svg`<svg viewBox="0 0 24 24" id="call-merge"><g><path d="M17 20.41L18.41 19 15 15.59 13.59 17 17 20.41zM7.5 8H11v5.59L5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8z"></path></g></svg>`;
export const call_merge = communication_call_merge;
iconMap["communication:call-merge"] = iconMap["call-merge"] = communication_call_merge;