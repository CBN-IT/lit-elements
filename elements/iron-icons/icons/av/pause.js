import {svg} from 'lit'
export const av_pause = svg`<svg viewBox="0 0 24 24" id="pause"><g><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></g></svg>`;
export const pause = av_pause;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:pause"] = window.icons["pause"] = av_pause;
