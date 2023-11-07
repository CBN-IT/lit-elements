import {svg} from 'lit'
export const image_filter_none = svg`<svg viewBox="0 0 24 24" id="filter-none"><g><path d="M3 5H1v16c0 1.1.9 2 2 2h16v-2H3V5zm18-4H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 16H7V3h14v14z"></path></g></svg>`;
export const filter_none = image_filter_none;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:filter-none"] = window.icons["filter-none"] = image_filter_none;
