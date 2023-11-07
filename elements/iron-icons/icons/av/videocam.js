import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const av_videocam = svg`<svg viewBox="0 0 24 24" id="videocam"><g><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"></path></g></svg>`;
export const videocam = av_videocam;
iconMap["av:videocam"] = iconMap["videocam"] = av_videocam;
