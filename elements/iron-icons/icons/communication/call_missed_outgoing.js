import {svg} from 'lit'
export const communication_call_missed_outgoing = svg`<svg viewBox="0 0 24 24" id="call-missed-outgoing"><g><path d="M3 8.41l9 9 7-7V15h2V7h-8v2h4.59L12 14.59 4.41 7 3 8.41z"></path></g></svg>`;
export const call_missed_outgoing = communication_call_missed_outgoing;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:call-missed-outgoing"] = window.icons["call-missed-outgoing"] = communication_call_missed_outgoing;
