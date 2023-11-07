import {svg} from 'lit'
export const icons_more_horiz = svg`<svg viewBox="0 0 24 24" id="more-horiz"><g><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g></svg>`;
export const more_horiz = icons_more_horiz;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:more-horiz"] = window.icons["more-horiz"] = icons_more_horiz;
