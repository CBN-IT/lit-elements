import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const av_play_arrow = svg`<svg viewBox="0 0 24 24" id="play-arrow"><g><path d="M8 5v14l11-7z"></path></g></svg>`;
export const play_arrow = av_play_arrow;
iconMap["av:play-arrow"] = iconMap["play-arrow"] = av_play_arrow;
