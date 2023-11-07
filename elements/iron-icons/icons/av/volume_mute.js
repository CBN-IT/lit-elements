import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const av_volume_mute = svg`<svg viewBox="0 0 24 24" id="volume-mute"><g><path d="M7 9v6h4l5 5V4l-5 5H7z"></path></g></svg>`;
export const volume_mute = av_volume_mute;
iconMap["av:volume-mute"] = iconMap["volume-mute"] = av_volume_mute;
