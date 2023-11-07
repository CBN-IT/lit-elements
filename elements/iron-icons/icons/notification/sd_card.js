import {svg} from 'lit'
export const notification_sd_card = svg`<svg viewBox="0 0 24 24" id="sd-card"><g><path d="M18 2h-8L4.02 8 4 20c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 6h-2V4h2v4zm3 0h-2V4h2v4zm3 0h-2V4h2v4z"></path></g></svg>`;
export const sd_card = notification_sd_card;
if(window.icons === undefined){ window.icons = {}; }
window.icons["notification:sd-card"] = window.icons["sd-card"] = notification_sd_card;
