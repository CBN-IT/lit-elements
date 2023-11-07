import {svg} from 'lit'
export const icons_sort = svg`<svg viewBox="0 0 24 24" id="sort"><g><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"></path></g></svg>`;
export const sort = icons_sort;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:sort"] = window.icons["sort"] = icons_sort;
