import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const av_featured_play_list = svg`<svg viewBox="0 0 24 24" id="featured-play-list"><g><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 8H3V9h9v2zm0-4H3V5h9v2z"></path></g></svg>`;
export const featured_play_list = av_featured_play_list;
iconMap["av:featured-play-list"] = iconMap["featured-play-list"] = av_featured_play_list;
