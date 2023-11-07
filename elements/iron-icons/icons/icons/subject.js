import {svg} from 'lit'
export const icons_subject = svg`<svg viewBox="0 0 24 24" id="subject"><g><path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"></path></g></svg>`;
export const subject = icons_subject;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:subject"] = window.icons["subject"] = icons_subject;
