import {svg} from 'lit'
export const icons_expand_more = svg`<svg viewBox="0 0 24 24" id="expand-more"><g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></g></svg>`;
export const expand_more = icons_expand_more;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:expand-more"] = window.icons["expand-more"] = icons_expand_more;
