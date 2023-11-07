import {svg} from 'lit'
export const notification_priority_high = svg`<svg viewBox="0 0 24 24" id="priority-high"><g><circle cx="12" cy="19" r="2"></circle><path d="M10 3h4v12h-4z"></path></g></svg>`;
export const priority_high = notification_priority_high;
if(window.icons === undefined){ window.icons = {}; }
window.icons["notification:priority-high"] = window.icons["priority-high"] = notification_priority_high;
