import {svg} from 'lit'
export const icons_markunread_mailbox = svg`<svg viewBox="0 0 24 24" id="markunread-mailbox"><g><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path></g></svg>`;
export const markunread_mailbox = icons_markunread_mailbox;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:markunread-mailbox"] = window.icons["markunread-mailbox"] = icons_markunread_mailbox;
