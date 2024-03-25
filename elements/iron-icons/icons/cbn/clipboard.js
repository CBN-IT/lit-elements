import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const cbn_clipboard = svg`<svg id="clipboard" viewBox="0 0 36 36"><path d="M23.3 7.2v3.6h-14V7.2c0-1.3 1.1-2.4 2.4-2.4h.8l.8-1.3A4 4 0 0 1 20 4.8h1c1.4 0 2.4 1.1 2.4 2.4Zm-2 0c0-.2 0-.3-.2-.4h-3V6A2 2 0 0 0 15 4.8l-.5 1-.2 1h-2.6l-.3.2v1.8h10Zm10.3 11.7a1 1 0 0 1 0 2h-12l3 2.8v.2a1 1 0 0 1-.8 1.5 1 1 0 0 1-.7-.3L15.8 20l5.2-5.3a1 1 0 1 1 1.5 1.4l-2.9 2.8h12ZM27.3 8h-2V6h2.4c1 0 1.7.7 1.6 1.6v9.3h-2Zm0 15h2v9.2c0 1-.7 1.7-1.6 1.7H5c-.9 0-1.7-.7-1.7-1.7V7.5c0-.9.8-1.6 1.6-1.7h2.4v2h-2v24h22Z" class="clr-i-outline clr-i-outline-path-1"></path></svg>`;
export const clipboard = cbn_clipboard;
iconMap["cbn:clipboard"] = iconMap["clipboard"] = cbn_clipboard;
