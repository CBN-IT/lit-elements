import {svg} from 'lit'
export const av_remove_from_queue = svg`<svg viewBox="0 0 24 24" id="remove-from-queue"><g><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-7v2H8v-2h8z"></path></g></svg>`;
export const remove_from_queue = av_remove_from_queue;
if(window.icons === undefined){ window.icons = {}; }
window.icons["av:remove-from-queue"] = window.icons["remove-from-queue"] = av_remove_from_queue;
