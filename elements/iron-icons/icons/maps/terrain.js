import {svg} from 'lit'
export const maps_terrain = svg`<svg viewBox="0 0 24 24" id="terrain"><g><path d="M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22L14 6z"></path></g></svg>`;
export const terrain = maps_terrain;
if(window.icons === undefined){ window.icons = {}; }
window.icons["maps:terrain"] = window.icons["terrain"] = maps_terrain;
