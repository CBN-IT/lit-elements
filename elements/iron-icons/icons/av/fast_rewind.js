import {svg} from 'lit'
export const av_fast_rewind = svg`<svg viewBox="0 0 24 24" id="fast-rewind"><g><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"></path></g></svg>`;
export const fast_rewind = av_fast_rewind;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:fast-rewind"] = window.icons["fast-rewind"] = av_fast_rewind;
