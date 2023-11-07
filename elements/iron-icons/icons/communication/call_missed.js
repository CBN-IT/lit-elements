import {svg} from 'lit'
export const communication_call_missed = svg`<svg viewBox="0 0 24 24" id="call-missed"><g><path d="M19.59 7L12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9z"></path></g></svg>`;
export const call_missed = communication_call_missed;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:call-missed"] = window.icons["call-missed"] = communication_call_missed;
