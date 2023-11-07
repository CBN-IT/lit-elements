import {svg} from 'lit'
export const maps_local_parking = svg`<svg viewBox="0 0 24 24" id="local-parking"><g><path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"></path></g></svg>`;
export const local_parking = maps_local_parking;
if(window.icons === undefined){ window.icons = {}; }
window.icons["maps:local-parking"] = window.icons["local-parking"] = maps_local_parking;
