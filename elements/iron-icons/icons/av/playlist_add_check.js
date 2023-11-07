import {svg} from 'lit'
export const av_playlist_add_check = svg`<svg viewBox="0 0 24 24" id="playlist-add-check"><g><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z"></path></g></svg>`;
export const playlist_add_check = av_playlist_add_check;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:playlist-add-check"] = window.icons["playlist-add-check"] = av_playlist_add_check;
