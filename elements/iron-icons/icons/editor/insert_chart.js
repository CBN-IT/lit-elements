import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_insert_chart = svg`<svg viewBox="0 0 24 24" id="insert-chart"><g><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></g></svg>`;
export const insert_chart = editor_insert_chart;
iconMap["editor:insert-chart"] = iconMap["insert-chart"] = editor_insert_chart;
