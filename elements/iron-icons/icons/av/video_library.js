import {svg} from 'lit'
export const av_video_library = svg`<svg viewBox="0 0 24 24" id="video-library"><g><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></g></svg>`;
export const video_library = av_video_library;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:video-library"] = window.icons["video-library"] = av_video_library;
