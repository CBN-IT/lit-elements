import {svg} from 'lit'
export const icons_shop_two = svg`<svg viewBox="0 0 24 24" id="shop-two"><g><path d="M3 9H1v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2H3V9zm15-4V3c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H5v11c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2V5h-5zm-6-2h4v2h-4V3zm0 12V8l5.5 3-5.5 4z"></path></g></svg>`;
export const shop_two = icons_shop_two;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:shop-two"] = window.icons["shop-two"] = icons_shop_two;
