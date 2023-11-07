import {svg} from 'lit'
export const hardware_laptop = svg`<svg viewBox="0 0 24 24" id="laptop"><g><path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"></path></g></svg>`;
export const laptop = hardware_laptop;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:laptop"] = window.icons["laptop"] = hardware_laptop;
