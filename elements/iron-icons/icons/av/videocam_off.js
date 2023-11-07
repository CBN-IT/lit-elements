import {svg} from 'lit'
export const av_videocam_off = svg`<svg viewBox="0 0 24 24" id="videocam-off"><g><path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.54-.18L19.73 21 21 19.73 3.27 2z"></path></g></svg>`;
export const videocam_off = av_videocam_off;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:videocam-off"] = window.icons["videocam-off"] = av_videocam_off;
