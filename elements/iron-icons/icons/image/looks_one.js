import {svg} from 'lit'
export const image_looks_one = svg`<svg viewBox="0 0 24 24" id="looks-one"><g><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"></path></g></svg>`;
export const looks_one = image_looks_one;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:looks-one"] = window.icons["looks-one"] = image_looks_one;
