import {svg} from 'lit'
export const icons_accessibility = svg`<svg viewBox="0 0 24 24" id="accessibility"><g><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"></path></g></svg>`;
export const accessibility = icons_accessibility;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:accessibility"] = window.icons["accessibility"] = icons_accessibility;
