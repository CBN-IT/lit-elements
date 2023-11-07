import {svg} from 'lit'
export const icons_trending_flat = svg`<svg viewBox="0 0 24 24" id="trending-flat"><g><path d="M22 12l-4-4v3H3v2h15v3z"></path></g></svg>`;
export const trending_flat = icons_trending_flat;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:trending-flat"] = window.icons["trending-flat"] = icons_trending_flat;
