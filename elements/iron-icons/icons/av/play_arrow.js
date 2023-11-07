import {svg} from 'lit'
export const av_play_arrow = svg`<svg viewBox="0 0 24 24" id="play-arrow"><g><path d="M8 5v14l11-7z"></path></g></svg>`;
export const play_arrow = av_play_arrow;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:play-arrow"] = window.icons["play-arrow"] = av_play_arrow;
