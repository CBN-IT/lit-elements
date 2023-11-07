import {svg} from 'lit'
export const communication_mail_outline = svg`<svg viewBox="0 0 24 24" id="mail-outline"><g><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"></path></g></svg>`;
export const mail_outline = communication_mail_outline;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:mail-outline"] = window.icons["mail-outline"] = communication_mail_outline;
