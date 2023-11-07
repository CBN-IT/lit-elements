import {svg} from 'lit'
export const av_video_call = svg`<svg viewBox="0 0 24 24" id="video-call"><g><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"></path></g></svg>`;
export const video_call = av_video_call;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:video-call"] = window.icons["video-call"] = av_video_call;
