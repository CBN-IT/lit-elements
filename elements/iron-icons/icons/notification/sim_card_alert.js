import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const notification_sim_card_alert = svg`<svg viewBox="0 0 24 24" id="sim-card-alert"><g><path d="M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 15h-2v-2h2v2zm0-4h-2V8h2v5z"></path></g></svg>`;
export const sim_card_alert = notification_sim_card_alert;
iconMap["notification:sim-card-alert"] = iconMap["sim-card-alert"] = notification_sim_card_alert;
