import {svg} from 'lit'
export const av_stop = svg`<svg viewBox="0 0 24 24" id="stop"><g><path d="M6 6h12v12H6z"></path></g></svg>`;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:stop"] = window.icons["stop"] = av_stop;
