import {svg} from 'lit'
export const icons_feedback = svg`<svg viewBox="0 0 24 24" id="feedback"><g><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"></path></g></svg>`;
export const feedback = icons_feedback;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:feedback"] = window.icons["feedback"] = icons_feedback;
