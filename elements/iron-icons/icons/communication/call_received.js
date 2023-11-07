import {svg} from 'lit'
export const communication_call_received = svg`<svg viewBox="0 0 24 24" id="call-received"><g><path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"></path></g></svg>`;
export const call_received = communication_call_received;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:call-received"] = window.icons["call-received"] = communication_call_received;
