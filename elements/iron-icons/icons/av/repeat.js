import {svg} from 'lit'
export const av_repeat = svg`<svg viewBox="0 0 24 24" id="repeat"><g><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"></path></g></svg>`;
export const repeat = av_repeat;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:repeat"] = window.icons["repeat"] = av_repeat;
