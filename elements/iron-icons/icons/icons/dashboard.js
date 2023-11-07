import {svg} from 'lit'
export const icons_dashboard = svg`<svg viewBox="0 0 24 24" id="dashboard"><g><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path></g></svg>`;
export const dashboard = icons_dashboard;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:dashboard"] = window.icons["dashboard"] = icons_dashboard;
