import {svg} from 'lit'
export const av_web_asset = svg`<svg viewBox="0 0 24 24" id="web-asset"><g><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2zm0 14H5V8h14v10z"></path></g></svg>`;
export const web_asset = av_web_asset;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:web-asset"] = window.icons["web-asset"] = av_web_asset;
