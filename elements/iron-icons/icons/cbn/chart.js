import {svg} from 'lit'
export const cbn_chart = svg`<svg id="chart" viewBox="0 0 24 24"><g><path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M7,20H9V14H7V20M11,20H13V12H11V20M15,20H17V16H15V20Z"></path></g></svg>`;
export const chart = cbn_chart;
if(window.icons === undefined){ window.icons = {}; }
window.icons["cbn:chart"] = window.icons["chart"] = cbn_chart;
