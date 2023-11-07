import {svg} from 'lit'
export const image_nature = svg`<svg viewBox="0 0 24 24" id="nature"><g><path d="M13 16.12c3.47-.41 6.17-3.36 6.17-6.95 0-3.87-3.13-7-7-7s-7 3.13-7 7c0 3.47 2.52 6.34 5.83 6.89V20H5v2h14v-2h-6v-3.88z"></path></g></svg>`;
export const nature = image_nature;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:nature"] = window.icons["nature"] = image_nature;
