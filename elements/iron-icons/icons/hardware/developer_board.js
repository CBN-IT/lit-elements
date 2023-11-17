import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const hardware_developer_board = svg`<svg viewBox="0 0 24 24" id="developer-board"><g><path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z"></path></g></svg>`;
export const developer_board = hardware_developer_board;
iconMap["hardware:developer-board"] = iconMap["developer-board"] = hardware_developer_board;