import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const av_airplay = svg`<svg viewBox="0 0 24 24" id="airplay"><g><path d="M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g></svg>`;
export const airplay = av_airplay;
iconMap["av:airplay"] = iconMap["airplay"] = av_airplay;
