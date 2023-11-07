import {svg} from 'lit'
export const icons_check_box_outline_blank = svg`<svg viewBox="0 0 24 24" id="check-box-outline-blank"><g><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g></svg>`;
export const check_box_outline_blank = icons_check_box_outline_blank;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:check-box-outline-blank"] = window.icons["check-box-outline-blank"] = icons_check_box_outline_blank;
