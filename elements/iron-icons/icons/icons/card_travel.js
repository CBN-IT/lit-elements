import {svg} from 'lit'
export const icons_card_travel = svg`<svg viewBox="0 0 24 24" id="card-travel"><g><path d="M20 6h-3V4c0-1.11-.89-2-2-2H9c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM9 4h6v2H9V4zm11 15H4v-2h16v2zm0-5H4V8h3v2h2V8h6v2h2V8h3v6z"></path></g></svg>`;
export const card_travel = icons_card_travel;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:card-travel"] = window.icons["card-travel"] = icons_card_travel;
