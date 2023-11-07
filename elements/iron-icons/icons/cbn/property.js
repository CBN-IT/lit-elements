import {svg} from 'lit'
export const cbn_property = svg`<svg id="property" viewBox="0 0 32 32"><path d="M16 25.3a2 2 0 01-1-.2L5 20 1 21.9 16 29.3l14.8-7.4L27 20l-10 5a2 2 0 01-1 .3zM30.7 9.9l-14.8 7.4L1.1 9.9l14.8-7.4 14.8 7.4z"></path><path d="M16 19.3a2 2 0 01-1-.2L5 14 1 15.9 16 23.3l14.8-7.4L27 14l-10 5a2 2 0 01-1 .3z"></path></svg>`;
export const property = cbn_property;
if(window.icons === undefined){ window.icons = {}; }
window.icons["cbn:property"] = window.icons["property"] = cbn_property;
