import {svg} from 'lit'
export const icons_view_carousel = svg`<svg viewBox="0 0 24 24" id="view-carousel"><g><path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"></path></g></svg>`;
export const view_carousel = icons_view_carousel;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:view-carousel"] = window.icons["view-carousel"] = icons_view_carousel;
