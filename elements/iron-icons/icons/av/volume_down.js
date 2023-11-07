import {svg} from 'lit'
export const av_volume_down = svg`<svg viewBox="0 0 24 24" id="volume-down"><g><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"></path></g></svg>`;
export const volume_down = av_volume_down;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:volume-down"] = window.icons["volume-down"] = av_volume_down;
