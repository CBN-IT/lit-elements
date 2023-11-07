import {svg} from 'lit'
export const maps_zoom_out_map = svg`<svg viewBox="0 0 24 24" id="zoom-out-map"><g><path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6z"></path></g></svg>`;
export const zoom_out_map = maps_zoom_out_map;
if(window.icons === undefined){ window.icons = {}; }
window.icons["maps:zoom-out-map"] = window.icons["zoom-out-map"] = maps_zoom_out_map;
