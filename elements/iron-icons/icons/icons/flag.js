import {svg} from 'lit'
export const icons_flag = svg`<svg viewBox="0 0 24 24" id="flag"><g><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path></g></svg>`;
export const flag = icons_flag;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:flag"] = window.icons["flag"] = icons_flag;
