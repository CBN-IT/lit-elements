import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const editor_pie_chart = svg`<svg viewBox="0 0 24 24" id="pie-chart"><g><path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"></path></g></svg>`;
export const pie_chart = editor_pie_chart;
iconMap["editor:pie-chart"] = iconMap["pie-chart"] = editor_pie_chart;
