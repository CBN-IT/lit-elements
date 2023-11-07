import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const image_view_compact = svg`<svg viewBox="0 0 24 24" id="view-compact"><g><path d="M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z"></path></g></svg>`;
export const view_compact = image_view_compact;
iconMap["image:view-compact"] = iconMap["view-compact"] = image_view_compact;
