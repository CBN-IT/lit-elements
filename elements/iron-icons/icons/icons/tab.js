import {svg} from 'lit'
export const icons_tab = svg`<svg viewBox="0 0 24 24" id="tab"><g><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h10v4h8v10z"></path></g></svg>`;
export const tab = icons_tab;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:tab"] = window.icons["tab"] = icons_tab;
