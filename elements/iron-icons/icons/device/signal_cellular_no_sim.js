import {svg} from 'lit'
export const device_signal_cellular_no_sim = svg`<svg viewBox="0 0 24 24" id="signal-cellular-no-sim"><g><path d="M18.99 5c0-1.1-.89-2-1.99-2h-7L7.66 5.34 19 16.68 18.99 5zM3.65 3.88L2.38 5.15 5 7.77V19c0 1.1.9 2 2 2h10.01c.35 0 .67-.1.96-.26l1.88 1.88 1.27-1.27L3.65 3.88z"></path></g></svg>`;
export const signal_cellular_no_sim = device_signal_cellular_no_sim;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:signal-cellular-no-sim"] = window.icons["signal-cellular-no-sim"] = device_signal_cellular_no_sim;
