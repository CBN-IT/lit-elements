import {svg} from 'lit'
export const maps_local_bar = svg`<svg viewBox="0 0 24 24" id="local-bar"><g><path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z"></path></g></svg>`;
export const local_bar = maps_local_bar;
if(window.icons === undefined){ window.icons = {}; }
window.icons["maps:local-bar"] = window.icons["local-bar"] = maps_local_bar;
