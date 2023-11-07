import {svg} from 'lit'
export const notification_confirmation_number = svg`<svg viewBox="0 0 24 24" id="confirmation-number"><g><path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z"></path></g></svg>`;
export const confirmation_number = notification_confirmation_number;
if(window.icons === undefined){ window.icons = {}; }
window.icons["notification:confirmation-number"] = window.icons["confirmation-number"] = notification_confirmation_number;
