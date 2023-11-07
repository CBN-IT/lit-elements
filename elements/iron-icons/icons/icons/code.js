import {svg} from 'lit'
export const icons_code = svg`<svg viewBox="0 0 24 24" id="code"><g><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path></g></svg>`;
export const code = icons_code;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:code"] = window.icons["code"] = icons_code;
