import {svg} from 'lit'
export const av_volume_mute = svg`<svg viewBox="0 0 24 24" id="volume-mute"><g><path d="M7 9v6h4l5 5V4l-5 5H7z"></path></g></svg>`;
export const volume_mute = av_volume_mute;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:volume-mute"] = window.icons["volume-mute"] = av_volume_mute;
