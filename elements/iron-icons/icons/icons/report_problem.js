import {svg} from 'lit'
export const icons_report_problem = svg`<svg viewBox="0 0 24 24" id="report-problem"><g><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g></svg>`;
export const report_problem = icons_report_problem;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:report-problem"] = window.icons["report-problem"] = icons_report_problem;
