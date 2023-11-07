import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const av_playlist_play = svg`<svg viewBox="0 0 24 24" id="playlist-play"><g><path d="M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z"></path></g></svg>`;
export const playlist_play = av_playlist_play;
iconMap["av:playlist-play"] = iconMap["playlist-play"] = av_playlist_play;
