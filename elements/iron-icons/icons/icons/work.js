import {svg} from 'lit'
export const icons_work = svg`<svg viewBox="0 0 24 24" id="work"><g><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></g></svg>`;
export const work = icons_work;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:work"] = window.icons["work"] = icons_work;
