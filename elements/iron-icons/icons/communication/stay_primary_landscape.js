import {svg} from 'lit'
export const communication_stay_primary_landscape = svg`<svg viewBox="0 0 24 24" id="stay-primary-landscape"><g><path d="M1.01 7L1 17c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H3c-1.1 0-1.99.9-1.99 2zM19 7v10H5V7h14z"></path></g></svg>`;
export const stay_primary_landscape = communication_stay_primary_landscape;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:stay-primary-landscape"] = window.icons["stay-primary-landscape"] = communication_stay_primary_landscape;
