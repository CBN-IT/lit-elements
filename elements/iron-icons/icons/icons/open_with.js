import {svg} from 'lit'
export const icons_open_with = svg`<svg viewBox="0 0 24 24" id="open-with"><g><path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path></g></svg>`;
export const open_with = icons_open_with;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:open-with"] = window.icons["open-with"] = icons_open_with;
