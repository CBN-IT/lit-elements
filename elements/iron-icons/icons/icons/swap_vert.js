import {svg} from 'lit'
export const icons_swap_vert = svg`<svg viewBox="0 0 24 24" id="swap-vert"><g><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></g></svg>`;
export const swap_vert = icons_swap_vert;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:swap-vert"] = window.icons["swap-vert"] = icons_swap_vert;
