import {svg} from 'lit'
export const communication_stay_primary_portrait = svg`<svg viewBox="0 0 24 24" id="stay-primary-portrait"><g><path d="M17 1.01L7 1c-1.1 0-1.99.9-1.99 2v18c0 1.1.89 2 1.99 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></g></svg>`;
export const stay_primary_portrait = communication_stay_primary_portrait;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:stay-primary-portrait"] = window.icons["stay-primary-portrait"] = communication_stay_primary_portrait;
