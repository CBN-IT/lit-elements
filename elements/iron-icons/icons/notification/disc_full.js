import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const notification_disc_full = svg`<svg viewBox="0 0 24 24" id="disc-full"><g><path d="M20 16h2v-2h-2v2zm0-9v5h2V7h-2zM10 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></g></svg>`;
export const disc_full = notification_disc_full;
iconMap["notification:disc-full"] = iconMap["disc-full"] = notification_disc_full;