import {svg} from 'lit'
export const av_play_circle_filled = svg`<svg viewBox="0 0 24 24" id="play-circle-filled"><g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"></path></g></svg>`;
export const play_circle_filled = av_play_circle_filled;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:play-circle-filled"] = window.icons["play-circle-filled"] = av_play_circle_filled;
