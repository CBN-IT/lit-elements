import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const av_video_label = svg`<svg viewBox="0 0 24 24" id="video-label"><g><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H3V5h18v11z"></path></g></svg>`;
export const video_label = av_video_label;
iconMap["av:video-label"] = iconMap["video-label"] = av_video_label;
