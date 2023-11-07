import {svg} from 'lit'
export const icons_announcement = svg`<svg viewBox="0 0 24 24" id="announcement"><g><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"></path></g></svg>`;
export const announcement = icons_announcement;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:announcement"] = window.icons["announcement"] = icons_announcement;
