import {svg} from 'lit'
export const icons_account_balance = svg`<svg viewBox="0 0 24 24" id="account-balance"><g><path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-4.5-9L2 6v2h19V6l-9.5-5z"></path></g></svg>`;
export const account_balance = icons_account_balance;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:account-balance"] = window.icons["account-balance"] = icons_account_balance;
