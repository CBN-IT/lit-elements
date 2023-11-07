import {svg} from 'lit'
export const communication_import_export = svg`<svg viewBox="0 0 24 24" id="import-export"><g><path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z"></path></g></svg>`;
export const import_export = communication_import_export;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:import-export"] = window.icons["import-export"] = communication_import_export;
