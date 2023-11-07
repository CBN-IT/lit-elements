import {svg} from 'lit'
export const av_pause_circle_filled = svg`<svg viewBox="0 0 24 24" id="pause-circle-filled"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path></g></svg>`;
export const pause_circle_filled = av_pause_circle_filled;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:pause-circle-filled"] = window.icons["pause-circle-filled"] = av_pause_circle_filled;
