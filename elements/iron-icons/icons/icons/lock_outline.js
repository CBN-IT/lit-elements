import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const icons_lock_outline = svg`<svg viewBox="0 0 24 24" id="lock-outline"><g><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6zM18 20H6V10h12v10z"></path></g></svg>`;
export const lock_outline = icons_lock_outline;
iconMap["icons:lock-outline"] = iconMap["lock-outline"] = icons_lock_outline;