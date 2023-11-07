import {svg} from 'lit'
export const icons_store = svg`<svg viewBox="0 0 24 24" id="store"><g><path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></g></svg>`;
export const store = icons_store;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:store"] = window.icons["store"] = icons_store;
