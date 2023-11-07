import {svg} from 'lit'
export const icons_credit_card = svg`<svg viewBox="0 0 24 24" id="credit-card"><g><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path></g></svg>`;
export const credit_card = icons_credit_card;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:credit-card"] = window.icons["credit-card"] = icons_credit_card;
