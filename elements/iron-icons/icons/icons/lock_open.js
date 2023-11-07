import {svg} from 'lit'
export const icons_lock_open = svg`<svg viewBox="0 0 24 24" id="lock-open"><g><path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"></path></g></svg>`;
export const lock_open = icons_lock_open;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:lock-open"] = window.icons["lock-open"] = icons_lock_open;
