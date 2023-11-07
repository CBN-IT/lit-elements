import {svg} from 'lit'
export const av_fast_forward = svg`<svg viewBox="0 0 24 24" id="fast-forward"><g><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"></path></g></svg>`;
export const fast_forward = av_fast_forward;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:fast-forward"] = window.icons["fast-forward"] = av_fast_forward;
