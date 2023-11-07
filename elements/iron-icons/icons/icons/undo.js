import {svg} from 'lit'
export const icons_undo = svg`<svg viewBox="0 0 24 24" id="undo"><g><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"></path></g></svg>`;
export const undo = icons_undo;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:undo"] = window.icons["undo"] = icons_undo;
