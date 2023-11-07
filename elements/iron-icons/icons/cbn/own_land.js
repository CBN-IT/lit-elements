import {svg} from 'lit'
export const cbn_own_land = svg`<svg id="own-land" viewBox="0 0 32 32"><path fill="none" stroke="#000" stroke-miterlimit="10" d="M15.2 30.6l15-22.4-17.3-6.8L1.4 18.2l13.8 12.4z"></path><path d="M11.5 0h4v4h-4zM28 5.2h4v4h-4zM13 28h4v4h-4zM0 16.4h4v4H0z"></path></svg>`;
export const own_land = cbn_own_land;
if(window.icons === undefined){ window.icons = {}; }
window.icons["cbn:own-land"] = window.icons["own-land"] = cbn_own_land;
