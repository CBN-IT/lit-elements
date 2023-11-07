import {svg} from 'lit'
export const communication_swap_calls = svg`<svg viewBox="0 0 24 24" id="swap-calls"><g><path d="M18 4l-4 4h3v7c0 1.1-.9 2-2 2s-2-.9-2-2V8c0-2.21-1.79-4-4-4S5 5.79 5 8v7H2l4 4 4-4H7V8c0-1.1.9-2 2-2s2 .9 2 2v7c0 2.21 1.79 4 4 4s4-1.79 4-4V8h3l-4-4z"></path></g></svg>`;
export const swap_calls = communication_swap_calls;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:swap-calls"] = window.icons["swap-calls"] = communication_swap_calls;
