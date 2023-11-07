import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const cbn_dashboard = svg`<svg id="dashboard" viewBox="0 0 32 32"><path fill="#8bb110" d="M1 13h3v7H1z"></path><path fill="#edab00" d="M6 7h3v13H6z"></path><path fill="#007bbd" d="M11 3h3v17h-3zm12.5 16v-7.8a8.1 8.1 0 0 0-7.4 5.2Z"></path><path fill="#fac262" d="m30.4 24.2-5.2-3.5-1.5-1-7.8-2.7a8.1 8.1 0 0 0 3.3 9.2 8.2 8.2 0 0 0 11.2-2Z"></path><path fill="#8bb110" d="M24.1 11.2v8l6.7 4.5a7.7 7.7 0 0 0 1.2-4.3 8.2 8.2 0 0 0-7.9-8.2Z"></path></svg>`;
export const dashboard = cbn_dashboard;
iconMap["cbn:dashboard"] = iconMap["dashboard"] = cbn_dashboard;
