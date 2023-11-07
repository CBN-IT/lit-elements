import {svg} from 'lit'
export const icons_view_agenda = svg`<svg viewBox="0 0 24 24" id="view-agenda"><g><path d="M20 13H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zm0-10H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z"></path></g></svg>`;
export const view_agenda = icons_view_agenda;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:view-agenda"] = window.icons["view-agenda"] = icons_view_agenda;
