import {svg} from 'lit'
export const cbn_lease_report = svg`<svg id="lease-report" viewBox="0 0 32 32"><path stroke="var(--iron-icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" d="M11.9 6h8.4M11.9 9h8.4M11.9 12h8.4"></path><path d="M29.5 12h-27A2.5 2.5 0 000 14.5v10A2.5 2.5 0 002.5 27h3.3v-4h20.4v4h3.3a2.5 2.5 0 002.5-2.5v-10a2.5 2.5 0 00-2.5-2.5z"></path><path d="M7.8 25h16.4v6H7.8z"></path><path fill="#fff" stroke="var(--iron-icon-color, currentColor)" stroke-miterlimit="10" stroke-width="2" d="M22.3 16H10a8.7 8.7 0 01-2 0V4a2 2 0 012-2h12.4a2 2 0 012 2v12z"></path><path stroke="var(--iron-icon-color, currentColor)" stroke-linecap="round" stroke-linejoin="round" d="M11.9 6h8.4M11.9 9h8.4M11.9 12h8.4"></path><circle cx="4.3" cy="20.3" r="1.3" fill="#fff"></circle></svg>`;
export const lease_report = cbn_lease_report;
if(window.icons === undefined){ window.icons = {}; }
window.icons["cbn:lease-report"] = window.icons["lease-report"] = cbn_lease_report;
