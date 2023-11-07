import {svg} from 'lit'
export const icons_account_box = svg`<svg viewBox="0 0 24 24" id="account-box"><g><path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"></path></g></svg>`;
export const account_box = icons_account_box;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:account-box"] = window.icons["account-box"] = icons_account_box;
