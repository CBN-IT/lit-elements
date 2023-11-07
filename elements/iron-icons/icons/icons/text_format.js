import {svg} from 'lit'
export const icons_text_format = svg`<svg viewBox="0 0 24 24" id="text-format"><g><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></path></g></svg>`;
export const text_format = icons_text_format;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:text-format"] = window.icons["text-format"] = icons_text_format;
