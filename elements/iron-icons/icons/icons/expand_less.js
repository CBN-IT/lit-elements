import {svg} from 'lit'
export const icons_expand_less = svg`<svg viewBox="0 0 24 24" id="expand-less"><g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path></g></svg>`;
export const expand_less = icons_expand_less;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:expand-less"] = window.icons["expand-less"] = icons_expand_less;
