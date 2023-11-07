import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_toc = svg`<svg viewBox="0 0 24 24" id="toc"><g><path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path></g></svg>`;
export const toc = icons_toc;
iconMap["icons:toc"] = iconMap["toc"] = icons_toc;
