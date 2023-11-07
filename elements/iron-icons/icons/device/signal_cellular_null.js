import {svg} from 'lit'
export const device_signal_cellular_null = svg`<svg viewBox="0 0 24 24" id="signal-cellular-null"><g><path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z"></path></g></svg>`;
export const signal_cellular_null = device_signal_cellular_null;
if(window.icons === undefined){ window.icons = {}; }
window.icons["device:signal-cellular-null"] = window.icons["signal-cellular-null"] = device_signal_cellular_null;
