import {svg} from 'lit'
export const icons_more_vert = svg`<svg viewBox="0 0 24 24" id="more-vert"><g><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></g></svg>`;
export const more_vert = icons_more_vert;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:more-vert"] = window.icons["more-vert"] = icons_more_vert;
