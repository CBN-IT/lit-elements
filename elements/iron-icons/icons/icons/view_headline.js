import {svg} from 'lit'
export const icons_view_headline = svg`<svg viewBox="0 0 24 24" id="view-headline"><g><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"></path></g></svg>`;
export const view_headline = icons_view_headline;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:view-headline"] = window.icons["view-headline"] = icons_view_headline;
