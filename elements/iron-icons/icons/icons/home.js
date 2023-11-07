import {svg} from 'lit'
export const icons_home = svg`<svg viewBox="0 0 24 24" id="home"><g><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></g></svg>`;
export const home = icons_home;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:home"] = window.icons["home"] = icons_home;
