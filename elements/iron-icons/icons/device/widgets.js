import {svg} from 'lit'
export const device_widgets = svg`<svg viewBox="0 0 24 24" id="widgets"><g><path d="M13 13v8h8v-8h-8zM3 21h8v-8H3v8zM3 3v8h8V3H3zm13.66-1.31L11 7.34 16.66 13l5.66-5.66-5.66-5.65z"></path></g></svg>`;
export const widgets = device_widgets;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:widgets"] = window.icons["widgets"] = device_widgets;
