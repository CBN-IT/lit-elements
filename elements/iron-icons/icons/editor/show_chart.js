import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_show_chart = svg`<svg viewBox="0 0 24 24" id="show-chart"><g><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"></path></g></svg>`;
export const show_chart = editor_show_chart;
iconMap["editor:show-chart"] = iconMap["show-chart"] = editor_show_chart;