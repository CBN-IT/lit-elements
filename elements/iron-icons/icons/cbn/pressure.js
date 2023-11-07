import {svg} from 'lit'
export const cbn_pressure = svg`<svg id="pressure" viewBox="0 0 24 24"><g><path d="M12.01 10.3a1.7 1.7 0 01-1.7-1.69 1.69 1.69 0 012.08-1.66l2.38-1.88c.25-.18.54-.2.75 0 .2.22.18.53-.01.76L13.63 8.2a1.7 1.7 0 01-1.62 2.1zM1.08 18.8c0-.47.38-.85.84-.85h7.56v-2.14A7.65 7.65 0 014.44 8.6C4.44 4.38 7.84.94 12 .94a7.62 7.62 0 017.56 7.66c0 3.32-2.1 6.15-5.04 7.2v2.15h7.56c.46 0 .84.38.84.85s-.38.86-.84.86H1.92a.85.85 0 01-.84-.86zM12 13.7c2.78 0 5.04-2.29 5.04-5.1S14.78 3.5 12 3.5 6.96 5.77 6.96 8.6s2.26 5.1 5.04 5.1zm10.08 7.66H1.92c-.46 0-.84.38-.84.85s.38.85.84.85h20.16c.46 0 .84-.38.84-.85s-.38-.85-.84-.85z"></path></g></svg>`;
export const pressure = cbn_pressure;
if(window.icons === undefined){ window.icons = {}; }
window.icons["cbn:pressure"] = window.icons["pressure"] = cbn_pressure;
