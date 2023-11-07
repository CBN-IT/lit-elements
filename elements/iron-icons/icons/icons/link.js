import {svg} from 'lit'
export const icons_link = svg`<svg viewBox="0 0 24 24" id="link"><g><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g></svg>`;
export const link = icons_link;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:link"] = window.icons["link"] = icons_link;
