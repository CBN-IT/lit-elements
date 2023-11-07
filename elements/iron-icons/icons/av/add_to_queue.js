import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const av_add_to_queue = svg`<svg viewBox="0 0 24 24" id="add-to-queue"><g><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-7v2h-3v3h-2v-3H8v-2h3V7h2v3h3z"></path></g></svg>`;
export const add_to_queue = av_add_to_queue;
iconMap["av:add-to-queue"] = iconMap["add-to-queue"] = av_add_to_queue;