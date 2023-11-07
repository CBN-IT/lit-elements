import {svg} from 'lit'
export const icons_indeterminate_check_box = svg`<svg viewBox="0 0 24 24" id="indeterminate-check-box"><g><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path></g></svg>`;
export const indeterminate_check_box = icons_indeterminate_check_box;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:indeterminate-check-box"] = window.icons["indeterminate-check-box"] = icons_indeterminate_check_box;
