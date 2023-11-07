import {svg} from 'lit'
export const notification_system_update = svg`<svg viewBox="0 0 24 24" id="system-update"><g><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-1-6h-3V8h-2v5H8l4 4 4-4z"></path></g></svg>`;
export const system_update = notification_system_update;
if(window.icons === undefined){ window.icons = {}; }
window.icons["notification:system-update"] = window.icons["system-update"] = notification_system_update;
