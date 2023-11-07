import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const social_poll = svg`<svg viewBox="0 0 24 24" id="poll"><g><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g></svg>`;
export const poll = social_poll;
iconMap["social:poll"] = iconMap["poll"] = social_poll;
