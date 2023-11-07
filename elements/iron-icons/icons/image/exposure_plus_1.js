import {svg} from 'lit'
export const image_exposure_plus_1 = svg`<svg viewBox="0 0 24 24" id="exposure-plus-1"><g><path d="M10 7H8v4H4v2h4v4h2v-4h4v-2h-4V7zm10 11h-2V7.38L15 8.4V6.7L19.7 5h.3v13z"></path></g></svg>`;
export const exposure_plus_1 = image_exposure_plus_1;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:exposure-plus-1"] = window.icons["exposure-plus-1"] = image_exposure_plus_1;
