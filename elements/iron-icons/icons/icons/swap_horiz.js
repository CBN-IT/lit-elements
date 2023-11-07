import {svg} from 'lit'
export const icons_swap_horiz = svg`<svg viewBox="0 0 24 24" id="swap-horiz"><g><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></g></svg>`;
export const swap_horiz = icons_swap_horiz;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:swap-horiz"] = window.icons["swap-horiz"] = icons_swap_horiz;
