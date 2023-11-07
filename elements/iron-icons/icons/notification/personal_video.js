import {svg} from 'lit'
export const notification_personal_video = svg`<svg viewBox="0 0 24 24" id="personal-video"><g><path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12z"></path></g></svg>`;
export const personal_video = notification_personal_video;
if(window.icons === undefined){ window.icons = {}; }
window.icons["notification:personal-video"] = window.icons["personal-video"] = notification_personal_video;
