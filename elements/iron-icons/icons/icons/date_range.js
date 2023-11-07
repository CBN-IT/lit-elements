import {svg} from 'lit'
export const icons_date_range = svg`<svg viewBox="0 0 24 24" id="date-range"><g><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"></path></g></svg>`;
export const date_range = icons_date_range;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:date-range"] = window.icons["date-range"] = icons_date_range;
