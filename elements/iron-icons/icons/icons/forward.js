import {svg} from 'lit'
export const icons_forward = svg`<svg viewBox="0 0 24 24" id="forward"><g><path d="M12 8V4l8 8-8 8v-4H4V8z"></path></g></svg>`;
export const forward = icons_forward;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:forward"] = window.icons["forward"] = icons_forward;
