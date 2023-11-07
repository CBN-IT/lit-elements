import {svg} from 'lit'
export const av_skip_previous = svg`<svg viewBox="0 0 24 24" id="skip-previous"><g><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"></path></g></svg>`;
export const skip_previous = av_skip_previous;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:skip-previous"] = window.icons["skip-previous"] = av_skip_previous;
