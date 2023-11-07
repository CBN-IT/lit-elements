import {svg} from 'lit'
export const image_dehaze = svg`<svg viewBox="0 0 24 24" id="dehaze"><g><path d="M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z"></path></g></svg>`;
export const dehaze = image_dehaze;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:dehaze"] = window.icons["dehaze"] = image_dehaze;
