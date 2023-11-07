import {svg} from 'lit'
export const icons_spellcheck = svg`<svg viewBox="0 0 24 24" id="spellcheck"><g><path d="M12.45 16h2.09L9.43 3H7.57L2.46 16h2.09l1.12-3h5.64l1.14 3zm-6.02-5L8.5 5.48 10.57 11H6.43zm15.16.59l-8.09 8.09L9.83 16l-1.41 1.41 5.09 5.09L23 13l-1.41-1.41z"></path></g></svg>`;
export const spellcheck = icons_spellcheck;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:spellcheck"] = window.icons["spellcheck"] = icons_spellcheck;
