import {svg} from 'lit'
export const image_grid_on = svg`<svg viewBox="0 0 24 24" id="grid-on"><g><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"></path></g></svg>`;
export const grid_on = image_grid_on;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:grid-on"] = window.icons["grid-on"] = image_grid_on;
