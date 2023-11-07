import {svg} from 'lit'
export const hardware_laptop_chromebook = svg`<svg viewBox="0 0 24 24" id="laptop-chromebook"><g><path d="M22 18V3H2v15H0v2h24v-2h-2zm-8 0h-4v-1h4v1zm6-3H4V5h16v10z"></path></g></svg>`;
export const laptop_chromebook = hardware_laptop_chromebook;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:laptop-chromebook"] = window.icons["laptop-chromebook"] = hardware_laptop_chromebook;
