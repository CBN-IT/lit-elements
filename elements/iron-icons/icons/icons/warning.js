import {svg} from 'lit'
export const icons_warning = svg`<svg viewBox="0 0 24 24" id="warning"><g><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></g></svg>`;
export const warning = icons_warning;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:warning"] = window.icons["warning"] = icons_warning;
