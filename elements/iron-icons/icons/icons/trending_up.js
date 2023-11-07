import {svg} from 'lit'
export const icons_trending_up = svg`<svg viewBox="0 0 24 24" id="trending-up"><g><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></g></svg>`;
export const trending_up = icons_trending_up;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:trending-up"] = window.icons["trending-up"] = icons_trending_up;
