import {svg} from 'lit'
export const hardware_laptop_windows = svg`<svg viewBox="0 0 24 24" id="laptop-windows"><g><path d="M20 18v-1c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2v1H0v2h24v-2h-4zM4 5h16v10H4V5z"></path></g></svg>`;
export const laptop_windows = hardware_laptop_windows;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:laptop-windows"] = window.icons["laptop-windows"] = hardware_laptop_windows;
