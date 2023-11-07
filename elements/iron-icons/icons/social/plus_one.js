import {svg} from 'lit'
export const social_plus_one = svg`<svg viewBox="0 0 24 24" id="plus-one"><g><path d="M10 8H8v4H4v2h4v4h2v-4h4v-2h-4zm4.5-1.92V7.9l2.5-.5V18h2V5z"></path></g></svg>`;
export const plus_one = social_plus_one;
if(window.icons === undefined){ window.icons = {}; }
window.icons["social:plus-one"] = window.icons["plus-one"] = social_plus_one;
