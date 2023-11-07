import {svg} from 'lit'
export const device_storage = svg`<svg viewBox="0 0 24 24" id="storage"><g><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"></path></g></svg>`;
export const storage = device_storage;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:storage"] = window.icons["storage"] = device_storage;
