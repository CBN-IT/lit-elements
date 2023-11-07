import {svg} from 'lit'
export const icons_star_half = svg`<svg viewBox="0 0 24 24" id="star-half"><g><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path></g></svg>`;
export const star_half = icons_star_half;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:star-half"] = window.icons["star-half"] = icons_star_half;
