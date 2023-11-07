import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const communication_screen_share = svg`<svg viewBox="0 0 24 24" id="screen-share"><g><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.11-.9-2-2-2H4c-1.11 0-2 .89-2 2v10c0 1.1.89 2 2 2H0v2h24v-2h-4zm-7-3.53v-2.19c-2.78 0-4.61.85-6 2.72.56-2.67 2.11-5.33 6-5.87V7l4 3.73-4 3.74z"></path></g></svg>`;
export const screen_share = communication_screen_share;
iconMap["communication:screen-share"] = iconMap["screen-share"] = communication_screen_share;
