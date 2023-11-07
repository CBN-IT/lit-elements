import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_multiline_chart = svg`<svg viewBox="0 0 24 24" id="multiline-chart"><g><path d="M22 6.92l-1.41-1.41-2.85 3.21C15.68 6.4 12.83 5 9.61 5 6.72 5 4.07 6.16 2 8l1.42 1.42C5.12 7.93 7.27 7 9.61 7c2.74 0 5.09 1.26 6.77 3.24l-2.88 3.24-4-4L2 16.99l1.5 1.5 6-6.01 4 4 4.05-4.55c.75 1.35 1.25 2.9 1.44 4.55H21c-.22-2.3-.95-4.39-2.04-6.14L22 6.92z"></path></g></svg>`;
export const multiline_chart = editor_multiline_chart;
iconMap["editor:multiline-chart"] = iconMap["multiline-chart"] = editor_multiline_chart;
