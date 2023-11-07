import {svg} from 'lit'
export const av_skip_next = svg`<svg viewBox="0 0 24 24" id="skip-next"><g><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path></g></svg>`;
export const skip_next = av_skip_next;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:skip-next"] = window.icons["skip-next"] = av_skip_next;
