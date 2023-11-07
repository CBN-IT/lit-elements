import {svg} from 'lit'
export const places_free_breakfast = svg`<svg viewBox="0 0 24 24" id="free-breakfast"><g><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.9 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z"></path></g></svg>`;
export const free_breakfast = places_free_breakfast;
if(window.icons === undefined){ window.icons = {}; }
window.icons["places:free-breakfast"] = window.icons["free-breakfast"] = places_free_breakfast;
