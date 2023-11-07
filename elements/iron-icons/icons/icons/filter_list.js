import {svg} from 'lit'
export const icons_filter_list = svg`<svg viewBox="0 0 24 24" id="filter-list"><g><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path></g></svg>`;
export const filter_list = icons_filter_list;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:filter-list"] = window.icons["filter-list"] = icons_filter_list;
