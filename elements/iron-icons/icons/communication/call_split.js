import {svg} from 'lit'
export const communication_call_split = svg`<svg viewBox="0 0 24 24" id="call-split"><g><path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"></path></g></svg>`;
export const call_split = communication_call_split;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:call-split"] = window.icons["call-split"] = communication_call_split;
