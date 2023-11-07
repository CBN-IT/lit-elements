import {svg} from 'lit'
export const icons_eject = svg`<svg viewBox="0 0 24 24" id="eject"><g><path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"></path></g></svg>`;
export const eject = icons_eject;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:eject"] = window.icons["eject"] = icons_eject;
