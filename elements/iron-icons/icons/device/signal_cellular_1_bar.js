import {svg} from 'lit'
export const device_signal_cellular_1_bar = svg`<svg viewBox="0 0 24 24" id="signal-cellular-1-bar"><g><path fill-opacity=".3" d="M2 22h20V2z"></path><path d="M12 12L2 22h10z"></path></g></svg>`;
export const signal_cellular_1_bar = device_signal_cellular_1_bar;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:signal-cellular-1-bar"] = window.icons["signal-cellular-1-bar"] = device_signal_cellular_1_bar;
