import {svg} from 'lit'
export const icons_label = svg`<svg viewBox="0 0 24 24" id="label"><g><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></path></g></svg>`;
export const label = icons_label;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:label"] = window.icons["label"] = icons_label;
