import {svg} from 'lit'
export const icons_swap_vertical_circle = svg`<svg viewBox="0 0 24 24" id="swap-vertical-circle"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"></path></g></svg>`;
export const swap_vertical_circle = icons_swap_vertical_circle;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:swap-vertical-circle"] = window.icons["swap-vertical-circle"] = icons_swap_vertical_circle;
