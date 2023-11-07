import {svg} from 'lit'
export const hardware_watch = svg`<svg viewBox="0 0 24 24" id="watch"><g><path d="M20 12c0-2.54-1.19-4.81-3.04-6.27L16 0H8l-.95 5.73C5.19 7.19 4 9.45 4 12s1.19 4.81 3.05 6.27L8 24h8l.96-5.73C18.81 16.81 20 14.54 20 12zM6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z"></path></g></svg>`;
export const watch = hardware_watch;
if(window.icons === undefined){ window.icons = {}; }
window.icons["hardware:watch"] = window.icons["watch"] = hardware_watch;
