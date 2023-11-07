import {svg} from 'lit'
export const maps_near_me = svg`<svg viewBox="0 0 24 24" id="near-me"><g><path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"></path></g></svg>`;
export const near_me = maps_near_me;
if(window.icons === undefined){ window.icons = {}; }
window.icons["maps:near-me"] = window.icons["near-me"] = maps_near_me;
