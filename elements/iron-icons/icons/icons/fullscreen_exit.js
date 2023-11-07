import {svg} from 'lit'
export const icons_fullscreen_exit = svg`<svg viewBox="0 0 24 24" id="fullscreen-exit"><g><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></g></svg>`;
export const fullscreen_exit = icons_fullscreen_exit;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:fullscreen-exit"] = window.icons["fullscreen-exit"] = icons_fullscreen_exit;
