import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const maps_local_airport = svg`<svg viewBox="0 0 24 24" id="local-airport"><g><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"></path></g></svg>`;
export const local_airport = maps_local_airport;
iconMap["maps:local-airport"] = iconMap["local-airport"] = maps_local_airport;