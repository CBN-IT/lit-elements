import {svg} from 'lit'
export const av_movie = svg`<svg viewBox="0 0 24 24" id="movie"><g><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"></path></g></svg>`;
export const movie = av_movie;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:movie"] = window.icons["movie"] = av_movie;
