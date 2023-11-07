import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const av_subscriptions = svg`<svg viewBox="0 0 24 24" id="subscriptions"><g><path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"></path></g></svg>`;
export const subscriptions = av_subscriptions;
iconMap["av:subscriptions"] = iconMap["subscriptions"] = av_subscriptions;
