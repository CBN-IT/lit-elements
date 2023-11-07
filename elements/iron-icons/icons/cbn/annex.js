import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const cbn_annex = svg`<svg id="annex" viewBox="0 0 16 16"><rect width="8" height="9" x="7" y="6" rx=".5"></rect><path d="M14 7v7H8V7h6m.5-2h-7A1.5 1.5 0 006 6.5v8A1.5 1.5 0 007.5 16h7a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0014.5 5z"></path><path d="M10 2.3A1.3 1.3 0 008.7 1H1.3A1.3 1.3 0 000 2.3v8.3A1.4 1.4 0 001.4 12H5V6.5A2.5 2.5 0 017.5 4H10z"></path><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" d="M2 2.5h6M9.5 8.5h3M9.5 10.5h3M9.5 12.5h3"></path><path stroke="var(--iron-icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 1h4"></path><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 2h2"></path></svg>`;
export const annex = cbn_annex;
iconMap["cbn:annex"] = iconMap["annex"] = cbn_annex;
