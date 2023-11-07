import {svg} from 'lit'
export const image_hdr_weak = svg`<svg viewBox="0 0 24 24" id="hdr-weak"><g><path d="M5 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm12-2c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"></path></g></svg>`;
export const hdr_weak = image_hdr_weak;
if(window.icons === undefined){ window.icons = {}; }
window.icons["image:hdr-weak"] = window.icons["hdr-weak"] = image_hdr_weak;
