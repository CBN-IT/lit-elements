import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const av_featured_video = svg`<svg viewBox="0 0 24 24" id="featured-video"><g><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 9H3V5h9v7z"></path></g></svg>`;
export const featured_video = av_featured_video;
iconMap["av:featured-video"] = iconMap["featured-video"] = av_featured_video;
